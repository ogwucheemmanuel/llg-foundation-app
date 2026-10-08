from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from database import Base

class UserModel(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_order=True, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String)
    hashed_password = Column(String, nullable=False)

class CSRPartnerModel(Base):
    __tablename__ = "csr_partners"

    id = Column(Integer, primary_key=True, index=True)
    organization_name = Column(String, nullable=False)
    contact_person = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    partnership_type = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class BeneficiaryModel(Base):
    __tablename__ = "beneficiaries"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    track = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)