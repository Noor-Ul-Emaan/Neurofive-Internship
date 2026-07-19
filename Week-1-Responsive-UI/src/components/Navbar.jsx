import React from 'react';

const Navbar = () => {
  return (
    <nav style={{
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '1.2rem 8%', 
      background: '#13141c', 
      borderBottom: '1px solid #222533',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <h2 style={{ margin: 0, color: '#00dc82', letterSpacing: '1px', fontSize: '1.5rem' }}>NeuroTech</h2>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <a href="#features" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: '500', transition: '0.3s' }}>Features</a>
        <a href="#about" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: '500' }}>About</a>
        <button style={{ background: '#00dc82', color: '#000', border: 'none', padding: '0.5rem 1.2rem', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>Launch App</button>
      </div>
    </nav>
  );
};

export default Navbar;