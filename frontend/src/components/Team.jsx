import React from 'react';
import { Mail, Share2, Globe } from 'lucide-react';
import emmanuelPhoto from '../img/IMG-20260930-WA0029.jpg';
import emmanuelwife from '../img/IMG-20260930-WA0031.jpg';
import emmycoder from '../img/emmycoder.jpg';
import keno from '../img/keno.jpg';

export default function Team() {
const teamMembers = [
  {
    name: 'Unata Emmanuel Unata',
    role: 'Founder & Lead Developer',
    bio: 'Passionate about leveraging technology and community empowerment to drive sustainable social impact.',
    image: emmanuelPhoto, 
    email: 'ogwucheemmanuel2020@gmail.com'
  },
    {
      name: 'Dr. Sarah Adebayo',
      role: 'Head of Programs & Education',
      bio: 'Directs curriculum strategy for digital literacy and community skill acquisition workshops.',
      image: emmanuelwife,
      linkedin: '#',
      twitter: '#',
      email: 'sarah@llgfoundation.org'
    },
    {
      name: 'Unata kenneth Oche',
      role: 'Operations & Partnerships Lead',
      bio: 'Manages corporate partnerships, donor communications, and field resource logistics.',
      image: keno,
      linkedin: '#',
      twitter: '#',
      email: 'unatakennethoche@gmail.com'
    },
        {
      name: 'Ogwuche Joseph Emmanuel',
      role: 'Software Engineering',
      bio: 'Focused on software development, web technologies, and building user-centric digital solution.',
      image: emmycoder,
      linkedin: '#',
      twitter: '#',
      email: 'ogwucheemmanuel2020@gmail.com'
    },
    
    
  ];

  return (
    <section id="team" style={{ padding: '70px 16px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ backgroundColor: '#e2e8f0', color: '#0a192f', fontSize: '0.8rem', fontWeight: '700', padding: '4px 12px', borderRadius: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Our People
          </span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#0a192f', marginTop: '12px', marginBottom: '12px' }}>
            Meet the Team
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            The dedicated individuals driving the mission and impact of LLG Foundation.
          </p>
        </div>

        {/* Team Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                padding: '24px',
                textAlign: 'center',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <img 
                src={member.image} 
                alt={member.name} 
                style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginBottom: '16px',
                  border: '3px solid #e2e8f0'
                }}
              />
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0a192f', marginBottom: '4px' }}>
                {member.name}
              </h3>
              <p style={{ fontSize: '0.82rem', fontWeight: '700', color: '#eab308', backgroundColor: '#0a192f', padding: '2px 10px', borderRadius: '10px', marginBottom: '12px', display: 'inline-block' }}>
                {member.role}
              </p>
              <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5, marginBottom: '20px', flexGrow: 1 }}>
                {member.bio}
              </p>

              {/* Social Links */}
              <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', alignItems: 'center' }}>
                <a href={`mailto:${member.email}`} style={{ color: '#64748b', display: 'flex', alignItems: 'center' }} title="Email">
                  <Mail size={18} />
                </a>
                
                {/* Custom Inline LinkedIn Icon */}
                <a href={member.linkedin} style={{ color: '#64748b', display: 'flex', alignItems: 'center' }} title="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>

                {/* Custom Inline X/Twitter Icon */}
                <a href={member.twitter} style={{ color: '#64748b', display: 'flex', alignItems: 'center' }} title="Twitter">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}