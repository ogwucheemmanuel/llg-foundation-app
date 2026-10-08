import React, { useState, useEffect } from 'react';
import { Users, Building, RefreshCw, ArrowLeft, Search } from 'lucide-react';
import { fetchAllBeneficiaries, fetchAllCSRPartners } from '../services/api';

export default function AdminDashboard({ onBack }) {
  const [activeTab, setActiveTab] = useState('beneficiaries');
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [csrPartners, setCsrPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const [benData, csrData] = await Promise.all([
        fetchAllBeneficiaries(),
        fetchAllCSRPartners()
      ]);
      setBeneficiaries(benData);
      setCsrPartners(csrData);
    } catch (err) {
      console.error("Error loading admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredBeneficiaries = beneficiaries.filter(b => 
    b.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.track?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCSR = csrPartners.filter(c => 
    c.organization_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.contact_person?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '30px 20px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', backgroundColor: '#fff', padding: '20px 24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button 
              onClick={onBack} 
              style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f1f5f9', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', color: '#0a192f' }}
            >
              <ArrowLeft size={16} /> Back to Site
            </button>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0a192f', margin: 0 }}>LLG Foundation Portal Admin</h1>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '2px 0 0' }}>Manage applications and corporate partnership records</p>
            </div>
          </div>
          <button 
            onClick={loadData} 
            style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#0a192f', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '0.88rem' }}
          >
            <RefreshCw size={14} /> Refresh Data
          </button>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '28px' }}>
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 6px', fontWeight: '600' }}>Total Beneficiary Applications</p>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#0a192f', margin: 0 }}>{beneficiaries.length}</h2>
          </div>
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 6px', fontWeight: '600' }}>Total CSR Partnership Requests</p>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#0a192f', margin: 0 }}>{csrPartners.length}</h2>
          </div>
        </div>

        {/* Controls Bar: Tabs & Search */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '8px', backgroundColor: '#e2e8f0', padding: '4px', borderRadius: '10px' }}>
            <button
              onClick={() => setActiveTab('beneficiaries')}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 18px', border: 'none', borderRadius: '8px',
                backgroundColor: activeTab === 'beneficiaries' ? '#fff' : 'transparent',
                fontWeight: activeTab === 'beneficiaries' ? '700' : '600',
                color: activeTab === 'beneficiaries' ? '#0a192f' : '#64748b',
                boxShadow: activeTab === 'beneficiaries' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                cursor: 'pointer'
              }}
            >
              <Users size={16} /> Beneficiaries ({beneficiaries.length})
            </button>
            <button
              onClick={() => setActiveTab('csr')}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 18px', border: 'none', borderRadius: '8px',
                backgroundColor: activeTab === 'csr' ? '#fff' : 'transparent',
                fontWeight: activeTab === 'csr' ? '700' : '600',
                color: activeTab === 'csr' ? '#0a192f' : '#64748b',
                boxShadow: activeTab === 'csr' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                cursor: 'pointer'
              }}
            >
              <Building size={16} /> CSR Partners ({csrPartners.length})
            </button>
          </div>

          <div style={{ position: 'relative', width: '280px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              type="text" 
              placeholder={`Search ${activeTab}...`} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '8px 12px 8px 36px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        {/* Data Tables */}
        {loading ? (
          <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading records...</div>
        ) : activeTab === 'beneficiaries' ? (
          <div style={{ overflowX: 'auto', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#0a192f' }}>
                  <th style={{ padding: '12px 16px' }}>ID</th>
                  <th style={{ padding: '12px 16px' }}>Full Name</th>
                  <th style={{ padding: '12px 16px' }}>Email</th>
                  <th style={{ padding: '12px 16px' }}>Phone</th>
                  <th style={{ padding: '12px 16px' }}>Program Track</th>
                  <th style={{ padding: '12px 16px' }}>Date Registered</th>
                </tr>
              </thead>
              <tbody>
                {filteredBeneficiaries.length === 0 ? (
                  <tr><td colSpan="6" style={{ padding: '32px', textAlign: 'center', color: '#94a3b8' }}>No beneficiary applications found.</td></tr>
                ) : (
                  filteredBeneficiaries.map((b) => (
                    <tr key={b.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px 16px', fontWeight: '600', color: '#64748b' }}>#{b.id}</td>
                      <td style={{ padding: '12px 16px', fontWeight: '700', color: '#0a192f' }}>{b.full_name}</td>
                      <td style={{ padding: '12px 16px' }}>{b.email}</td>
                      <td style={{ padding: '12px 16px' }}>{b.phone}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ backgroundColor: '#eff6ff', color: '#1d4ed8', padding: '4px 10px', borderRadius: '12px', fontSize: '0.78rem', fontWeight: '700' }}>
                          {b.track}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#64748b' }}>{b.created_at}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ overflowX: 'auto', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#0a192f' }}>
                  <th style={{ padding: '12px 16px' }}>ID</th>
                  <th style={{ padding: '12px 16px' }}>Organization</th>
                  <th style={{ padding: '12px 16px' }}>Contact Person</th>
                  <th style={{ padding: '12px 16px' }}>Email</th>
                  <th style={{ padding: '12px 16px' }}>Phone</th>
                  <th style={{ padding: '12px 16px' }}>Partnership Type</th>
                  <th style={{ padding: '12px 16px' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredCSR.length === 0 ? (
                  <tr><td colSpan="7" style={{ padding: '32px', textAlign: 'center', color: '#94a3b8' }}>No CSR partnership requests found.</td></tr>
                ) : (
                  filteredCSR.map((c) => (
                    <tr key={c.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px 16px', fontWeight: '600', color: '#64748b' }}>#{c.id}</td>
                      <td style={{ padding: '12px 16px', fontWeight: '700', color: '#0a192f' }}>{c.organization_name}</td>
                      <td style={{ padding: '12px 16px' }}>{c.contact_person}</td>
                      <td style={{ padding: '12px 16px' }}>{c.email}</td>
                      <td style={{ padding: '12px 16px' }}>{c.phone}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ backgroundColor: '#fef3c7', color: '#b45309', padding: '4px 10px', borderRadius: '12px', fontSize: '0.78rem', fontWeight: '700' }}>
                          {c.partnership_type}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#64748b' }}>{c.created_at}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}