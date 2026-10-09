import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  RotateCw, 
  Search, 
  Users, 
  Building2, 
  Trash2, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { 
  fetchAllBeneficiaries, 
  fetchAllCSRPartners, 
  deleteBeneficiary, 
  deleteCSRPartner 
} from '../services/api';

export default function AdminDashboard({ onBack }) {
  const [activeTab, setActiveTab] = useState('beneficiaries'); // 'beneficiaries' | 'csr'
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [csrPartners, setCsrPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  // Load initial dashboard data
  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [beneficiariesData, csrData] = await Promise.all([
        fetchAllBeneficiaries(),
        fetchAllCSRPartners()
      ]);
      setBeneficiaries(beneficiariesData || []);
      setCsrPartners(csrData || []);
    } catch (err) {
      console.error("Error loading admin data:", err);
      setError("Failed to load dashboard records. Please verify admin session.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Handle Deleting Beneficiary
  const handleDeleteBeneficiary = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete beneficiary "${name}"?`)) {
      try {
        await deleteBeneficiary(id);
        setBeneficiaries(prev => prev.filter(item => item.id !== id));
      } catch (err) {
        alert("Failed to delete beneficiary record.");
      }
    }
  };

  // Handle Deleting CSR Partner
  const handleDeleteCSRPartner = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete CSR request from "${name}"?`)) {
      try {
        await deleteCSRPartner(id);
        setCsrPartners(prev => prev.filter(item => item.id !== id));
      } catch (err) {
        alert("Failed to delete CSR partner record.");
      }
    }
  };

  // Filtered lists based on search query
  const filteredBeneficiaries = beneficiaries.filter(item =>
    item.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.track?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.phone?.includes(searchQuery)
  );

  const filteredCSRPartners = csrPartners.filter(item =>
    item.organization_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.contact_person?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.partnership_type?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '24px 16px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <button 
              onClick={onBack}
              style={{ backgroundColor: '#fff', border: '1px solid #cbd5e1', padding: '6px 14px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', color: '#0a192f' }}
            >
              <ArrowLeft size={14} /> Back to Site
            </button>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0a192f', margin: 0 }}>
              LLG Foundation Portal Admin
            </h1>
            <p style={{ color: '#64748b', fontSize: '0.88rem', margin: 0 }}>
              Manage applications and corporate partnership records
            </p>
          </div>

          <button 
            onClick={loadData}
            disabled={loading}
            style={{ backgroundColor: '#0a192f', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <RotateCw size={14} className={loading ? 'spin' : ''} /> Refresh Data
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
            <AlertCircle size={18} /> {error}
          </div>
        )}

        {/* Stat Cards Overview */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ color: '#64748b', fontSize: '0.82rem', fontWeight: '600', textTransform: 'uppercase', marginBottom: '4px' }}>
              Total Beneficiary Applications
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '800', color: '#0a192f' }}>
              {beneficiaries.length}
            </div>
          </div>

          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ color: '#64748b', fontSize: '0.82rem', fontWeight: '600', textTransform: 'uppercase', marginBottom: '4px' }}>
              Total CSR Partnership Requests
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '800', color: '#0a192f' }}>
              {csrPartners.length}
            </div>
          </div>
        </div>

        {/* Controls Header: Tabs & Search */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px 12px 0 0', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          
          {/* Navigation Tabs */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setActiveTab('beneficiaries')}
              style={{
                backgroundColor: activeTab === 'beneficiaries' ? '#f1f5f9' : 'transparent',
                color: activeTab === 'beneficiaries' ? '#0a192f' : '#64748b',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '0.88rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Users size={16} /> Beneficiaries ({beneficiaries.length})
            </button>

            <button
              onClick={() => setActiveTab('csr')}
              style={{
                backgroundColor: activeTab === 'csr' ? '#f1f5f9' : 'transparent',
                color: activeTab === 'csr' ? '#0a192f' : '#64748b',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '0.88rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Building2 size={16} /> CSR Partners ({csrPartners.length})
            </button>
          </div>

          {/* Search Input Bar */}
          <div style={{ position: 'relative', minWidth: '260px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder={`Search ${activeTab === 'beneficiaries' ? 'beneficiaries' : 'CSR partners'}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Tables Section */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderTop: 'none', borderRadius: '0 0 12px 12px', overflowX: 'auto' }}>
          
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
              Loading dashboard records...
            </div>
          ) : activeTab === 'beneficiaries' ? (
            
            /* --- BENEFICIARIES TABLE --- */
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                  <th style={{ padding: '12px 16px' }}>ID</th>
                  <th style={{ padding: '12px 16px' }}>Full Name</th>
                  <th style={{ padding: '12px 16px' }}>Email</th>
                  <th style={{ padding: '12px 16px' }}>Phone</th>
                  <th style={{ padding: '12px 16px' }}>Program Track</th>
                  <th style={{ padding: '12px 16px' }}>Date Registered</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredBeneficiaries.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ padding: '32px', textAlign: 'center', color: '#94a3b8' }}>
                      No beneficiary records found.
                    </td>
                  </tr>
                ) : (
                  filteredBeneficiaries.map((item) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px 16px', fontWeight: '600', color: '#64748b' }}>#{item.id}</td>
                      <td style={{ padding: '12px 16px', fontWeight: '700', color: '#0a192f' }}>{item.full_name}</td>
                      <td style={{ padding: '12px 16px', color: '#475569' }}>{item.email}</td>
                      <td style={{ padding: '12px 16px', color: '#475569' }}>{item.phone}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ backgroundColor: '#eff6ff', color: '#1d4ed8', padding: '4px 8px', borderRadius: '12px', fontSize: '0.78rem', fontWeight: '600' }}>
                          {item.track}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#64748b', fontSize: '0.8rem' }}>{item.created_at || 'N/A'}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <button
                          onClick={() => handleDeleteBeneficiary(item.id, item.full_name)}
                          style={{
                            backgroundColor: '#fee2e2',
                            color: '#dc2626',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '0.78rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Trash2 size={13} /> Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

          ) : (

            /* --- CSR PARTNERS TABLE --- */
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                  <th style={{ padding: '12px 16px' }}>ID</th>
                  <th style={{ padding: '12px 16px' }}>Organization</th>
                  <th style={{ padding: '12px 16px' }}>Contact Person</th>
                  <th style={{ padding: '12px 16px' }}>Email</th>
                  <th style={{ padding: '12px 16px' }}>Phone</th>
                  <th style={{ padding: '12px 16px' }}>Partnership Type</th>
                  <th style={{ padding: '12px 16px' }}>Date</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCSRPartners.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ padding: '32px', textAlign: 'center', color: '#94a3b8' }}>
                      No CSR partner requests found.
                    </td>
                  </tr>
                ) : (
                  filteredCSRPartners.map((item) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px 16px', fontWeight: '600', color: '#64748b' }}>#{item.id}</td>
                      <td style={{ padding: '12px 16px', fontWeight: '700', color: '#0a192f' }}>{item.organization_name}</td>
                      <td style={{ padding: '12px 16px', color: '#475569' }}>{item.contact_person}</td>
                      <td style={{ padding: '12px 16px', color: '#475569' }}>{item.email}</td>
                      <td style={{ padding: '12px 16px', color: '#475569' }}>{item.phone}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ backgroundColor: '#f0fdf4', color: '#15803d', padding: '4px 8px', borderRadius: '12px', fontSize: '0.78rem', fontWeight: '600' }}>
                          {item.partnership_type}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#64748b', fontSize: '0.8rem' }}>{item.created_at || 'N/A'}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <button
                          onClick={() => handleDeleteCSRPartner(item.id, item.organization_name)}
                          style={{
                            backgroundColor: '#fee2e2',
                            color: '#dc2626',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '0.78rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Trash2 size={13} /> Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

          )}
        </div>

      </div>
    </div>
  );
}