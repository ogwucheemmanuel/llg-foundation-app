import React from 'react';
import { Heart, Target, Eye, ShieldCheck, Users, Award, Sparkles } from 'lucide-react';

export default function AboutUs() {
  const coreValues = [
    { title: "Love & Compassion", desc: "Expressing genuine care and empathy through practical action to support vulnerable individuals.", icon: <Heart size={20} /> },
    { title: "Integrity & Faith", desc: "Operating with absolute honesty, strong moral principles, and unwavering faith in humanity.", icon: <ShieldCheck size={20} /> },
    { title: "Accountability & Transparency", desc: "Ensuring open communication and responsible stewardship of all foundation resources.", icon: <Award size={20} /> },
    { title: "Service & Dignity", desc: "Upholding human dignity while selflessly serving communities without discrimination.", icon: <Users size={20} /> },
    { title: "Equality & Excellence", desc: "Fostering inclusive opportunities and maintaining high standards in every initiative.", icon: <Sparkles size={20} /> },
  ];

  return (
    <section id="about" style={{ padding: '70px 16px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ backgroundColor: '#e2e8f0', color: '#0a192f', fontSize: '0.8rem', fontWeight: '700', padding: '4px 12px', borderRadius: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Who We Are
          </span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#0a192f', marginTop: '12px', marginBottom: '12px' }}>
            About LLG Foundation
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6 }}>
            The **Leading Loving God Foundation (LLG)** is a proposed nonprofit organisation dedicated to serving humanity through practical action and compassion[cite: 13]. We believe in turning faith and love into practical opportunities for sustainable growth and community transformation[cite: 13].
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '56px' }}>
          
          {/* Mission */}
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #eaecf0', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#0a192f', color: '#eab308', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <Target size={26} />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0a192f', marginBottom: '12px' }}>Our Mission</h3>
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
              To express love through targeted initiatives focused on education support, digital and practical skills training, and direct community care for those in need[cite: 13].
            </p>
          </div>

          {/* Vision */}
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #eaecf0', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#0a192f', color: '#eab308', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <Eye size={26} />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0a192f', marginBottom: '12px' }}>Our Vision</h3>
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
              To foster resilient communities where vulnerable individuals are protected, young people are empowered with real skills, and families are strengthened[cite: 13].
            </p>
          </div>

        </div>

        {/* Core Values Section */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#0a192f' }}>Our Core Values</h3>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '6px' }}>The foundational principles that guide everything we do[cite: 13].</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            {coreValues.map((value, idx) => (
              <div key={idx} style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', transition: 'transform 0.2s ease' }}>
                <div style={{ color: '#0a192f', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ backgroundColor: '#f1f5f9', padding: '8px', borderRadius: '8px', color: '#0a192f' }}>
                    {value.icon}
                  </div>
                </div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0a192f', marginBottom: '6px' }}>{value.title}</h4>
                <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.5 }}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}