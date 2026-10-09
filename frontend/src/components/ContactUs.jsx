import React, { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactUs() {
  const formRef = useRef();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData(formRef.current);
    const name = formData.get('user_name');
    const userEmail = formData.get('user_email');
    const subject = encodeURIComponent(formData.get('subject') || 'LLG Foundation Contact Inquiry');
    const message = formData.get('message');

    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${userEmail}\n\nMessage:\n${message}`
    );

    // Triggers default email client (Gmail/Outlook/Apple Mail)
    window.location.href = `mailto:ogwucheemmanuel2020@gmail.com?subject=${subject}&body=${body}`;

    setSubmitted(true);
  };

  return (
    <section id="contact" style={{ padding: '70px 16px', backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ backgroundColor: '#e2e8f0', color: '#0a192f', fontSize: '0.8rem', fontWeight: '700', padding: '4px 12px', borderRadius: '12px', textTransform: 'uppercase' }}>
            Get In Touch
          </span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#0a192f', marginTop: '12px', marginBottom: '12px' }}>
            Contact Us
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            Have questions? Fill out the form below to send an email directly to our inbox.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
          
          {/* Contact Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '28px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0a192f', marginBottom: '20px' }}>Contact Information</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{ backgroundColor: '#0a192f', color: '#eab308', padding: '10px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0a192f', marginBottom: '2px' }}>Email Us</h4>
                    <p style={{ color: '#64748b', fontSize: '0.88rem' }}>
leadinglovinggodfoundation@gmail.com </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{ backgroundColor: '#0a192f', color: '#eab308', padding: '10px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0a192f', marginBottom: '2px' }}>Call Us</h4>
                    <p style={{ color: '#64748b', fontSize: '0.88rem' }}>+234 (0) 81 2200 3786</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{ backgroundColor: '#0a192f', color: '#eab308', padding: '10px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0a192f', marginBottom: '2px' }}>Office Address</h4>
                    <p style={{ color: '#64748b', fontSize: '0.88rem' }}>Flat 3B Gen. popoola close phase 1 Army Estate kurudu Abuja, Nigeria</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #eaecf0', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <CheckCircle2 size={48} color="#16a34a" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0a192f', marginBottom: '8px' }}>Mail Client Opened!</h3>
                <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '24px' }}>
                  Your email client has been opened with your pre-filled message. Click send in your mail application to finish.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  style={{ backgroundColor: '#0a192f', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#0a192f', marginBottom: '6px' }}>Full Name *</label>
                  <input type="text" name="user_name" required placeholder="Enter your full name" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#0a192f', marginBottom: '6px' }}>Email Address *</label>
                  <input type="email" name="user_email" required placeholder="Enter your email address" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#0a192f', marginBottom: '6px' }}>Subject</label>
                  <input type="text" name="subject" placeholder="What is this regarding?" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#0a192f', marginBottom: '6px' }}>Message *</label>
                  <textarea name="message" required rows={4} placeholder="Type your message here..." style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none', resize: 'vertical' }} />
                </div>

                <button 
                  type="submit"
                  style={{ backgroundColor: '#0a192f', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '8px', fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '8px' }}
                >
                  <Send size={16} /> Open Email Client
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}