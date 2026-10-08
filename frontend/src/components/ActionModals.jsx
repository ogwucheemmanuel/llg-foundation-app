import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Send } from 'lucide-react';
import { submitCSRPartner, submitBeneficiaryRegistration } from '../services/api';

/* -------------------------------------------------------------------------- */
/* 1. CSR PARTNERSHIP MODAL                                                  */
/* -------------------------------------------------------------------------- */
export function CSRModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    organization_name: '',
    contact_person: '',
    email: '',
    phone: '',
    partnership_type: 'Corporate Sponsorship'
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await submitCSRPartner(formData);
      setLoading(false);
      setSubmitted(true);
    } catch (err) {
      setLoading(false);
      setError('Failed to submit partnership form. Please try again.');
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setError('');
    onClose();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
      <div style={{ backgroundColor: '#fff', borderRadius: '16px', maxWidth: '480px', width: '100%', padding: '28px', position: 'relative' }}>
        <button onClick={handleResetAndClose} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
          <X size={20} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '20px 10px' }}>
            <CheckCircle size={48} color="#16a34a" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0a192f', marginBottom: '8px' }}>Partnership Request Submitted</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '20px' }}>Thank you! Our team will reach out to discuss partnership opportunities shortly.</p>
            <button onClick={handleResetAndClose} style={{ backgroundColor: '#0a192f', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0a192f', marginBottom: '4px' }}>Partner With Us (CSR)</h3>
            <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '10px' }}>Collaborate with LLG Foundation to drive sustainable community impact.</p>

            {error && <div style={{ backgroundColor: '#fef2f2', color: '#991b1b', padding: '10px', borderRadius: '8px', fontSize: '0.82rem' }}>{error}</div>}

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#0a192f', marginBottom: '4px' }}>Organization / Company Name</label>
              <input type="text" required value={formData.organization_name} onChange={(e) => setFormData({...formData, organization_name: e.target.value})} style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#0a192f', marginBottom: '4px' }}>Contact Person</label>
              <input type="text" required value={formData.contact_person} onChange={(e) => setFormData({...formData, contact_person: e.target.value})} style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#0a192f', marginBottom: '4px' }}>Email Address</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#0a192f', marginBottom: '4px' }}>Phone Number</label>
                <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#0a192f', marginBottom: '4px' }}>Partnership Type</label>
              <select value={formData.partnership_type} onChange={(e) => setFormData({...formData, partnership_type: e.target.value})} style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box', backgroundColor: '#fff' }}>
                <option>Corporate Sponsorship</option>
                <option>Resource / Tech Equipment Grant</option>
                <option>Employee Volunteering</option>
                <option>Program Co-funding</option>
              </select>
            </div>

            <button type="submit" disabled={loading} style={{ backgroundColor: '#0a192f', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '700', fontSize: '0.9rem', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Send size={16} /> {loading ? 'Submitting...' : 'Submit Partnership Request'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. BENEFICIARY REGISTRATION MODAL                                         */
/* -------------------------------------------------------------------------- */
export function BeneficiaryModal({ isOpen, onClose, defaultTrack }) {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    track: defaultTrack || 'Digital Literacy & Tech'
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (defaultTrack) {
      setFormData(prev => ({ ...prev, track: defaultTrack }));
    }
  }, [defaultTrack]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await submitBeneficiaryRegistration(formData);
      setLoading(false);
      setSubmitted(true);
    } catch (err) {
      setLoading(false);
      setError('Failed to submit application. Please try again.');
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setError('');
    onClose();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
      <div style={{ backgroundColor: '#fff', borderRadius: '16px', maxWidth: '440px', width: '100%', padding: '28px', position: 'relative' }}>
        <button onClick={handleResetAndClose} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
          <X size={20} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '20px 10px' }}>
            <CheckCircle size={48} color="#16a34a" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0a192f', marginBottom: '8px' }}>Application Received!</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '20px' }}>Your registration for <strong>{formData.track}</strong> has been saved. We will review your application soon.</p>
            <button onClick={handleResetAndClose} style={{ backgroundColor: '#0a192f', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0a192f', marginBottom: '4px' }}>Beneficiary Registration</h3>
            <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '10px' }}>Apply to participate in LLG Foundation empowering programs.</p>

            {error && <div style={{ backgroundColor: '#fef2f2', color: '#991b1b', padding: '10px', borderRadius: '8px', fontSize: '0.82rem' }}>{error}</div>}

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#0a192f', marginBottom: '4px' }}>Full Name</label>
              <input type="text" required value={formData.full_name} onChange={(e) => setFormData({...formData, full_name: e.target.value})} style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#0a192f', marginBottom: '4px' }}>Email Address</label>
              <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#0a192f', marginBottom: '4px' }}>Phone Number</label>
              <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#0a192f', marginBottom: '4px' }}>Program Track</label>
              <select value={formData.track} onChange={(e) => setFormData({...formData, track: e.target.value})} style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box', backgroundColor: '#fff' }}>
                <option>Digital Literacy & Tech</option>
                <option>Youth Empowerment</option>
                <option>Community Outreach</option>
                <option>Social Rehabilitation</option>
                <option>General Interest</option>
              </select>
            </div>

            <button type="submit" disabled={loading} style={{ backgroundColor: '#0a192f', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '700', fontSize: '0.9rem', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Send size={16} /> {loading ? 'Submitting...' : 'Register Application'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}