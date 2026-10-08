import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  UserCheck, 
  ShieldAlert, 
  HeartHandshake, 
  ArrowRight, 
  Heart, 
  User,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
  MoveRight
} from 'lucide-react';
import { fetchImpactStats, getCurrentUser } from './services/api';
import { CSRModal, BeneficiaryModal } from './components/ActionModals';
import LoginModal from './components/LoginModal';
import AdminDashboard from './components/AdminDashboard';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import './index.css';
import Team from './components/Team';
import { Users, Target, Calendar, Wallet } from 'lucide-react';

export default function App() {
  const [stats, setStats] = useState({
    youth_targeted: 100,
    focus_areas: 5,
    pilot_duration: '3 Months',
    project_budget: '₦6.5M'
  });

  const [currentUser, setCurrentUser] = useState(null);
  const [viewMode, setViewMode] = useState('main');
  const [isCSRModalOpen, setIsCSRModalOpen] = useState(false);
  const [isBeneficiaryModalOpen, setIsBeneficiaryModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchImpactStats()
      .then(data => setStats(data))
      .catch(err => console.error("Error fetching stats:", err));

    const token = localStorage.getItem('token');
    if (token) {
      getCurrentUser()
        .then(user => setCurrentUser(user))
        .catch(() => localStorage.removeItem('token'));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    setViewMode('main');
  };

  const requireAuth = (actionCallback) => {
    if (!currentUser) {
      setIsLoginModalOpen(true);
    } else {
      actionCallback();
    }
  };

  const handleOpenBeneficiaryTrack = (trackName) => {
    requireAuth(() => {
      setSelectedTrack(trackName);
      setIsBeneficiaryModalOpen(true);
    });
  };

  const handleOpenCSR = () => {
    requireAuth(() => {
      setIsCSRModalOpen(true);
    });
  };

  if (viewMode === 'admin') {
    return <AdminDashboard onBack={() => setViewMode('main')} />;
  }

  return (
    <div style={{ color: '#0a192f', minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {/* Main Navbar */}
      <header style={{ backgroundColor: '#fff', borderBottom: '1px solid #eaecf0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: '72px', padding: '10px 16px', maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
          
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            <div style={{ backgroundColor: '#0a192f', width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Heart size={20} fill="#eab308" color="#eab308" />
            </div>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0a192f', lineHeight: 1 }}>LLG</div>
              <div style={{ fontSize: '0.42rem', fontWeight: '600', letterSpacing: '0.5px', color: '#0a192f' , marginRight:'0.63rem'}}>
                LEADING LOVING GOD FOUNDATION
              </div>
            </div>
          </div>

          {/* Navigation Links */}
<nav className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
  <a href="#home" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#0a192f', textDecoration: 'none', fontWeight: '700', fontSize: '0.95rem' }}>Home</a>
  <a href="#about" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#64748b', textDecoration: 'none', fontWeight: '500', fontSize: '0.95rem' }}>About Us</a>
  <a href="#team" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#64748b', textDecoration: 'none', fontWeight: '500', fontSize: '0.95rem' }}>Team</a>
  <a href="#programs" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#64748b', textDecoration: 'none', fontWeight: '500', fontSize: '0.95rem' }}>Programs</a>
  <a href="#impact" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#64748b', textDecoration: 'none', fontWeight: '500', fontSize: '0.95rem' }}>Impact</a>
  <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#64748b', textDecoration: 'none', fontWeight: '500', fontSize: '0.95rem' }}>Contact</a>
</nav>

          {/* Right Actions Container */}
          <div className="right-actions-container" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
            {currentUser ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#0a192f', whiteSpace: 'nowrap' }}>
                  Hi, {currentUser.full_name?.split(' ')[0] || currentUser.username}
                </span>

                {currentUser.is_admin && (
                  <button 
                    onClick={() => setViewMode('admin')}
                    style={{ backgroundColor: '#0a192f', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '16px', fontWeight: '700', fontSize: '0.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}
                  >
                    <LayoutDashboard size={13} /> Admin
                  </button>
                )}

                <button 
                  onClick={handleLogout}
                  style={{ backgroundColor: '#f1f5f9', color: '#0a192f', border: '1px solid #cbd5e1', padding: '6px 10px', borderRadius: '16px', fontWeight: '600', fontSize: '0.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                  title="Logout"
                >
                  <LogOut size={13} />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                style={{ backgroundColor: 'transparent', color: '#0a192f', border: '1.5px solid #0a192f', padding: '6px 12px', borderRadius: '18px', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <User size={13} /> Login
              </button>
            )}

            <button 
              className="mobile-menu-btn" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              style={{ padding: '4px', marginLeft: '4px' }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </header>

      {/* Hero / Home Section */}
      <section id="home" style={{ backgroundColor: '#f8fafc', padding: '60px 16px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 className="hero-title" style={{ fontSize: '3rem', fontWeight: '900', color: '#0a192f', letterSpacing: '-0.5px', marginBottom: '16px' }}>
            LLG Foundation Portal
          </h1>
          <p className="hero-subtitle" style={{ color: '#64748b', fontSize: '1.15rem', fontWeight: '400', marginBottom: '32px' }}>
            Empowering communities and serving humanity.
          </p>

          <div className="hero-buttons" style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <button 
              onClick={handleOpenCSR}
              style={{ backgroundColor: '#0a192f', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '24px', fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              Partner With Us (CSR) <ArrowRight size={16} />
            </button>
            <button 
              onClick={() => handleOpenBeneficiaryTrack('General Interest')}
              style={{ backgroundColor: 'transparent', color: '#0a192f', border: '2px solid #0a192f', padding: '12px 24px', borderRadius: '24px', fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer' }}
            >
              Apply as Beneficiary
            </button>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section id="impact" style={{ backgroundColor: '#0a192f', color: '#fff', padding: '48px 16px' }}>
        <div className="stats-grid" style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2.2rem', color: '#eab308', fontWeight: '800', marginBottom: '4px' }}>{stats.youth_targeted}+</h2>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8' }}>Youths Targeted</p>
          </div>
          <div>
            <h2 style={{ fontSize: '2.2rem', color: '#eab308', fontWeight: '800', marginBottom: '4px' }}>{stats.focus_areas}</h2>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8' }}>Focus Areas</p>
          </div>
          <div>
            <h2 style={{ fontSize: '2.2rem', color: '#eab308', fontWeight: '800', marginBottom: '4px' }}>{stats.pilot_duration}</h2>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8' }}>Pilot Duration</p>
          </div>
          <div>
            <h2 style={{ fontSize: '2.2rem', color: '#eab308', fontWeight: '800', marginBottom: '4px' }}>{stats.project_budget}</h2>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8' }}>Project Budget</p>
          </div>
        </div>
      </section>

      {/* About Us Component */}
      <AboutUs />

      <Team />

      {/* Program Tracks Section */}
      <section id="programs" style={{ padding: '60px 16px', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0a192f' }}>Our Program Tracks</h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '6px' }}>Choose a track to register as a program beneficiary.</p>
          </div>

          <div className="programs-grid">
            {[
              { title: 'Digital Literacy & Tech', desc: 'Hands-on training in basic tech, coding, and digital tools.', icon: <GraduationCap size={28} /> },
              { title: 'Youth Empowerment', desc: 'Mentorship, leadership training, and skill development.', icon: <UserCheck size={28} /> },
              { title: 'Community Outreach', desc: 'Relief distribution, health awareness, and welfare support.', icon: <HeartHandshake size={28} /> },
              { title: 'Social Rehabilitation', desc: 'Guidance and support programs for vulnerable individuals.', icon: <ShieldAlert size={28} /> }
            ].map((track, i) => (
              <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', backgroundColor: '#f8fafc' }}>
                <div style={{ color: '#0a192f', marginBottom: '14px' }}>{track.icon}</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '8px', color: '#0a192f' }}>{track.title}</h3>
                <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '18px' }}>{track.desc}</p>
                <button 
                  onClick={() => handleOpenBeneficiaryTrack(track.title)}
                  style={{ backgroundColor: '#0a192f', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '0.82rem', fontWeight: '600', cursor: 'pointer', width: '100%' }}
                >
                  Register Interest →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Component */}
      <ContactUs />

            {/* Top Banner */}
      <div style={{ backgroundColor: '#0a192f', color: '#fff', fontSize: '0.78rem', padding: '10px 16px', textAlign: 'center', fontWeight: '500' }}>
        <span>Proposed Nonprofit Organisation | Corporate Affairs Commission (CAC) Registration Pending</span>
      </div>

      {/* Action Modals */}
      <CSRModal isOpen={isCSRModalOpen} onClose={() => setIsCSRModalOpen(false)} />
      <BeneficiaryModal isOpen={isBeneficiaryModalOpen} onClose={() => setIsBeneficiaryModalOpen(false)} defaultTrack={selectedTrack} />
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onLoginSuccess={async () => {
          try {
            const user = await getCurrentUser();
            setCurrentUser(user);
          } catch (err) {
            console.error("Failed to fetch user profile post-login:", err);
          }
        }} 
      />
    </div>
  );
}