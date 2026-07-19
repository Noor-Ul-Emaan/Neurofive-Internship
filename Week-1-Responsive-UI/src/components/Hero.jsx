import React from 'react';

const Hero = () => {
  return (
    <section style={{ 
      textAlign: 'center', 
      padding: '7rem 1.5rem', 
      background: 'radial-gradient(circle at top, #1e293b 0%, #0d0e12 70%)',
      color: '#fff' 
    }}>
      <span style={{ background: '#1e293b', color: '#00dc82', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600', border: '1px solid #334155' }}>
        ✨ NeuroFive Frontend Task
      </span>
      <h1 style={{ fontSize: '3.2rem', fontWeight: '8xl', marginTop: '1.5rem', marginBottom: '1.2rem', letterSpacing: '-1px', lineHeight: '1.2' }}>
        Responsive UI From <br/><span style={{ color: '#00dc82' }}>Design Brief</span>
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: '650px', margin: '0 auto 2.5rem', lineHeight: '1.6' }}>
        Prove you can build a clean, component-based frontend interface that scales seamlessly across mobile, tablet, and desktop viewports.
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button style={{ 
          padding: '0.9rem 2.2rem', 
          background: '#00dc82', 
          color: '#000', 
          border: 'none', 
          borderRadius: '8px', 
          fontSize: '1rem', 
          cursor: 'pointer',
          fontWeight: 'bold',
          boxShadow: '0 4px 20px rgba(0, 220, 130, 0.2)'
        }}>
          Explore Task
        </button>
        <button style={{ 
          padding: '0.9rem 2.2rem', 
          background: 'transparent', 
          color: '#fff', 
          border: '1px solid #334155', 
          borderRadius: '8px', 
          fontSize: '1rem', 
          cursor: 'pointer',
          fontWeight: '500'
        }}>
          View Docs
        </button>
      </div>
    </section>
  );
};

export default Hero;