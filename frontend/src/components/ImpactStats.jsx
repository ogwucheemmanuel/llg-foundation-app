import React, { useEffect, useState } from 'react';
import { fetchImpactStats } from '../services/api';

export default function ImpactStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchImpactStats()
      .then(data => setStats(data))
      .catch(err => console.error("Error fetching stats:", err));
  }, []);

  if (!stats) return <div style={{ color: '#fff', textAlign: 'center', padding: '20px' }}>Loading impact metrics...</div>;

  return (
    <div style={{ backgroundColor: '#0b2e4c', color: '#fff', padding: '30px 20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px', margin: '40px 0' }}>
      <div>
        <h3 style={{ color: '#e2ab23', fontSize: '2rem', margin: 0 }}>{stats.youth_targeted}+</h3>
        <p style={{ margin: '5px 0 0' }}>Young People Targeted</p>
      </div>
      <div>
        <h3 style={{ color: '#e2ab23', fontSize: '2rem', margin: 0 }}>{stats.focus_areas}</h3>
        <p style={{ margin: '5px 0 0' }}>Strategic Focus Areas</p>
      </div>
      <div>
        <h3 style={{ color: '#e2ab23', fontSize: '2rem', margin: 0 }}>{stats.pilot_duration}</h3>
        <p style={{ margin: '5px 0 0' }}>Pilot Programme</p>
      </div>
      <div>
        <h3 style={{ color: '#e2ab23', fontSize: '2rem', margin: 0 }}>{stats.project_budget}</h3>
        <p style={{ margin: '5px 0 0' }}>Project Budget (Planning)</p>
      </div>
    </div>
  );
}