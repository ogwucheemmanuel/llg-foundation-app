import React from 'react';
import { GraduationCap, UserCheck, ShieldAlert, HeartHandshake, Users } from 'lucide-react';

const focusAreas = [
  {
    icon: <GraduationCap size={32} color="#0b2e4c" />,
    title: "Education & Scholarships",
    description: "Supporting access to quality education and brighter futures."
  },
  {
    icon: <UserCheck size={32} color="#0b2e4c" />,
    title: "Youth Skills & Empowerment",
    description: "Building skills, confidence, and opportunities for young people."
  },
  {
    icon: <ShieldAlert size={32} color="#0b2e4c" />,
    title: "Child Protection & Anti-Trafficking",
    description: "Keeping children safe and protecting their rights and dignity."
  },
  {
    icon: <HeartHandshake size={32} color="#0b2e4c" />,
    title: "Women & Vulnerable Households",
    description: "Supporting women, families, and vulnerable groups with care and resources."
  },
  {
    icon: <Users size={32} color="#0b2e4c" />,
    title: "Humanitarian & Community Support",
    description: "Providing relief, development, and long-term community solutions."
  }
];

export default function FocusAreas() {
  return (
    <section style={{ margin: '60px 0', textAlign: 'center' }}>
      <h2 style={{ color: '#0b2e4c', fontSize: '2rem', marginBottom: '10px' }}>Our Focus Areas</h2>
      <p style={{ color: '#666', marginBottom: '40px' }}>
        We work across key areas to build stronger, safer, and more prosperous communities.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        padding: '0 10px'
      }}>
        {focusAreas.map((area, index) => (
          <div key={index} style={{
            backgroundColor: '#ffffff',
            padding: '30px 20px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <div style={{
              backgroundColor: '#f0f4f8',
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              {area.icon}
            </div>
            <h4 style={{ color: '#0b2e4c', margin: '10px 0', fontSize: '1.1rem' }}>{area.title}</h4>
            <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.4' }}>{area.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}