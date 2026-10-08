import React, { useState } from 'react';
import { X, Lock, User as UserIcon, Mail, UserPlus, LogIn } from 'lucide-react';
import { loginUser, registerUser } from '../services/api';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  
  // Login State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Register State
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await loginUser(username, password);
      setLoading(false);
      onLoginSuccess();
      onClose();
    } catch (err) {
      setLoading(false);
      setError('Invalid username or password. Please try again.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await registerUser({
        full_name: regFullName,
        email: regEmail,
        username: regUsername,
        password: regPassword
      });
      setLoading(false);
      setSuccess('Account created successfully! Auto-logging in...');
      
      // Auto-login after registration
      await loginUser(regUsername, regPassword);
      onLoginSuccess();
      onClose();
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.detail || 'Registration failed. Try again.');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '420px',
        padding: '28px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#666'
          }}
        >
          <X size={20} />
        </button>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #e5e7eb', paddingBottom: '10px' }}>
          <button
            onClick={() => { setIsRegisterMode(false); setError(''); setSuccess(''); }}
            style={{
              flex: 1,
              padding: '8px',
              border: 'none',
              background: 'none',
              fontWeight: '700',
              fontSize: '0.95rem',
              color: !isRegisterMode ? 'var(--navy-main)' : '#9ca3af',
              borderBottom: !isRegisterMode ? '2px solid var(--navy-main)' : 'none',
              cursor: 'pointer'
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => { setIsRegisterMode(true); setError(''); setSuccess(''); }}
            style={{
              flex: 1,
              padding: '8px',
              border: 'none',
              background: 'none',
              fontWeight: '700',
              fontSize: '0.95rem',
              color: isRegisterMode ? 'var(--navy-main)' : '#9ca3af',
              borderBottom: isRegisterMode ? '2px solid var(--navy-main)' : 'none',
              cursor: 'pointer'
            }}
          >
            Register
          </button>
        </div>

        {error && (
          <div style={{ backgroundColor: '#fef2f2', color: '#991b1b', padding: '10px', borderRadius: '8px', fontSize: '0.82rem', marginBottom: '14px', border: '1px solid #fecaca' }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ backgroundColor: '#f0fdf4', color: '#166534', padding: '10px', borderRadius: '8px', fontSize: '0.82rem', marginBottom: '14px', border: '1px solid #bbf7d0' }}>
            {success}
          </div>
        )}

        {!isRegisterMode ? (
          /* LOGIN FORM */
          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--navy-main)', marginBottom: '6px' }}>Username</label>
              <div style={{ position: 'relative' }}>
                <UserIcon size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                <input 
                  type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  placeholder="Enter username"
                  required
                  style={{ width: '100%', padding: '10px 12px 10px 38px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.9rem', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--navy-main)', marginBottom: '6px' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Enter password"
                  required
                  style={{ width: '100%', padding: '10px 12px 10px 38px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.9rem', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              style={{ backgroundColor: 'var(--navy-main)', color: '#ffffff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '700', fontSize: '0.9rem', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <LogIn size={16} /> {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        ) : (
          /* REGISTER FORM */
          <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--navy-main)', marginBottom: '4px' }}>Full Name</label>
              <input 
                type="text" 
                value={regFullName} 
                onChange={(e) => setRegFullName(e.target.value)} 
                placeholder="John Doe"
                required
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.88rem', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--navy-main)', marginBottom: '4px' }}>Email Address</label>
              <input 
                type="email" 
                value={regEmail} 
                onChange={(e) => setRegEmail(e.target.value)} 
                placeholder="john@example.com"
                required
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.88rem', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--navy-main)', marginBottom: '4px' }}>Username</label>
              <input 
                type="text" 
                value={regUsername} 
                onChange={(e) => setRegUsername(e.target.value)} 
                placeholder="johndoe"
                required
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.88rem', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--navy-main)', marginBottom: '4px' }}>Password</label>
              <input 
                type="password" 
                value={regPassword} 
                onChange={(e) => setRegPassword(e.target.value)} 
                placeholder="Create password"
                required
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.88rem', boxSizing: 'border-box' }}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              style={{ backgroundColor: 'var(--navy-main)', color: '#ffffff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '700', fontSize: '0.9rem', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <UserPlus size={16} /> {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}