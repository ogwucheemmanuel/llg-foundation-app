import sqlite3
from datetime import datetime, timedelta
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr

app = FastAPI()

# Enable CORS for React dev server
origins = [
    # "http://localhost:5173",
    # "http://127.0.0.1:5173",
    "https://llg-foundation-app.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# JWT & Password Config
SECRET_KEY = "your-secret-key-keep-it-secret"
ALGORITHM = "HS256"
ADMIN_USERNAME = "admin"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/token")
pwd_context = CryptContext(schemes=["pbkdf2_sha256", "bcrypt"], deprecated="auto")

# --- PYDANTIC SCHEMAS FOR API REQUESTS ---
class UserRegister(BaseModel):
    full_name: str
    email: str
    username: str
    password: str

class BeneficiaryRegister(BaseModel):
    full_name: str
    email: str
    phone: str
    track: str

class CSRPartnerRegister(BaseModel):
    organization_name: str
    contact_person: str
    email: str
    phone: str
    partnership_type: str

# --- AUTOMATIC DATABASE INITIALIZATION ---
def init_db():
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    
    # Create tables if they don't exist
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            full_name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS beneficiaries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            full_name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            track TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS csr_partners (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            organization_name TEXT NOT NULL,
            contact_person TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            partnership_type TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    # --- AUTO-SEED ADMIN USER IF NOT EXISTS ---
    cursor.execute("SELECT id FROM users WHERE username = ?", (ADMIN_USERNAME,))
    if not cursor.fetchone():
        # Default Admin Credentials
        default_admin_password = get_password_hash("Admin@1234")
        cursor.execute(
            "INSERT INTO users (full_name, email, username, password_hash) VALUES (?, ?, ?, ?)",
            ("System Admin", "admin@llgfoundation.org", ADMIN_USERNAME, default_admin_password)
        )
        print("Default admin user created: username='admin', password='Admin@1234'")

    conn.commit()
    conn.close()

init_db()

# --- HELPER UTILITIES ---
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=60)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_db():
    conn = sqlite3.connect("database.db", check_same_thread=False)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
    finally:
        conn.close()

def get_current_user(token: str = Depends(oauth2_scheme), db: sqlite3.Connection = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    cursor = db.cursor()
    cursor.execute("SELECT id, username, full_name, email FROM users WHERE username = ?", (username,))
    user = cursor.fetchone()
    
    if user is None:
        raise credentials_exception
        
    return dict(user)

def verify_admin(current_user: dict = Depends(get_current_user)):
    if current_user.get("username") != ADMIN_USERNAME:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail="Admin access required"
        )
    return current_user

# --- API ROUTES ---

# 1. Impact Metrics
@app.get("/api/v1/impact-stats")
def get_impact_stats():
    return {
        "youth_targeted": 100,
        "focus_areas": 5,
        "pilot_duration": "3 Months",
        "project_budget": "₦6.5M"
    }

# 2. User Registration
@app.post("/api/v1/users/register")
def register_user(user: UserRegister, db: sqlite3.Connection = Depends(get_db)):
    cursor = db.cursor()
    cursor.execute("SELECT id FROM users WHERE username = ? OR email = ?", (user.username, user.email))
    if cursor.fetchone():
        raise HTTPException(status_code=400, detail="Username or Email already registered")

    hashed_pw = get_password_hash(user.password)
    cursor.execute(
        "INSERT INTO users (full_name, email, username, password_hash) VALUES (?, ?, ?, ?)",
        (user.full_name, user.email, user.username, hashed_pw)
    )
    db.commit()
    return {"message": "User registered successfully"}

# 3. Authentication & JWT Token
@app.post("/api/v1/token")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: sqlite3.Connection = Depends(get_db)):
    cursor = db.cursor()
    cursor.execute("SELECT * FROM users WHERE username = ?", (form_data.username,))
    user = cursor.fetchone()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid username or password")

    user_dict = dict(user)
    if not verify_password(form_data.password, user_dict["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid username or password")

    access_token = create_access_token(data={"sub": user_dict["username"]})
    return {"access_token": access_token, "token_type": "bearer"}

# 4. User Profile
@app.get("/api/v1/users/me")
def get_me(current_user: dict = Depends(get_current_user)):
    user_data = dict(current_user)
    user_data["is_admin"] = (user_data.get("username") == ADMIN_USERNAME)
    return user_data

# 5. Beneficiary Registration
@app.post("/api/v1/beneficiaries/register")
def register_beneficiary(data: BeneficiaryRegister, db: sqlite3.Connection = Depends(get_db)):
    cursor = db.cursor()
    cursor.execute(
        "INSERT INTO beneficiaries (full_name, email, phone, track) VALUES (?, ?, ?, ?)",
        (data.full_name, data.email, data.phone, data.track)
    )
    db.commit()
    return {"message": "Beneficiary registration saved"}

# 6. CSR Partner Registration
@app.post("/api/v1/csr/partner")
def register_csr_partner(data: CSRPartnerRegister, db: sqlite3.Connection = Depends(get_db)):
    cursor = db.cursor()
    cursor.execute(
        "INSERT INTO csr_partners (organization_name, contact_person, email, phone, partnership_type) VALUES (?, ?, ?, ?, ?)",
        (data.organization_name, data.contact_person, data.email, data.phone, data.partnership_type)
    )
    db.commit()
    return {"message": "CSR request submitted"}


# --- ADMIN QUERIES ---

@app.get("/api/v1/admin/beneficiaries")
def get_all_beneficiaries(admin: dict = Depends(verify_admin), db: sqlite3.Connection = Depends(get_db)):
    cursor = db.cursor()
    cursor.execute("SELECT id, full_name, email, phone, track, created_at FROM beneficiaries ORDER BY id DESC")
    return [dict(row) for row in cursor.fetchall()]

@app.get("/api/v1/admin/csr-partners")
def get_all_csr_partners(admin: dict = Depends(verify_admin), db: sqlite3.Connection = Depends(get_db)):
    cursor = db.cursor()
    cursor.execute("SELECT id, organization_name, contact_person, email, phone, partnership_type, created_at FROM csr_partners ORDER BY id DESC")
    return [dict(row) for row in cursor.fetchall()]
class ContactSchema(BaseModel):
    name: str
    email: str
    subject: str
    message: str
# --- DELETE ADMIN ENDPOINTS ---

@app.delete("/api/v1/admin/beneficiaries/{beneficiary_id}")
def delete_beneficiary(
    beneficiary_id: int, 
    admin: dict = Depends(verify_admin), 
    db: sqlite3.Connection = Depends(get_db)
):
    cursor = db.cursor()
    cursor.execute("SELECT id FROM beneficiaries WHERE id = ?", (beneficiary_id,))
    if not cursor.fetchone():
        raise HTTPException(status_code=404, detail="Beneficiary not found")
        
    cursor.execute("DELETE FROM beneficiaries WHERE id = ?", (beneficiary_id,))
    db.commit()
    return {"message": "Beneficiary deleted successfully"}

@app.delete("/api/v1/admin/csr-partners/{partner_id}")
def delete_csr_partner(
    partner_id: int, 
    admin: dict = Depends(verify_admin), 
    db: sqlite3.Connection = Depends(get_db)
):
    cursor = db.cursor()
    cursor.execute("SELECT id FROM csr_partners WHERE id = ?", (partner_id,))
    if not cursor.fetchone():
        raise HTTPException(status_code=404, detail="CSR Partner not found")
        
    cursor.execute("DELETE FROM csr_partners WHERE id = ?", (partner_id,))
    db.commit()
    return {"message": "CSR Partner deleted successfully"}

# Gmail Configuration
GMAIL_USER = "ogwucheemmanuel2020@gmail.com"
GMAIL_APP_PASSWORD = "Emmycoder2003"  # Generate in Google Account Security -> App Passwords

@app.post("/api/contact")
def send_contact_email(data: ContactSchema):
    try:
        msg = MIMEMultipart()
        msg['From'] = GMAIL_USER
        msg['To'] = GMAIL_USER
        msg['Subject'] = f"LLG Portal Contact: {data.subject}"

        body = f"Name: {data.name}\nEmail: {data.email}\n\nMessage:\n{data.message}"
        msg.attach(MIMEText(body, 'plain'))

        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(GMAIL_USER, GMAIL_APP_PASSWORD)
        server.send_message(msg)
        server.quit()

        return {"status": "success", "message": "Email sent successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))