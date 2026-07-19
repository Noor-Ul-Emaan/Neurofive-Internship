import React from 'react';

const Features = () => {
  const cards = [
    { title: "Component Structure", desc: "Clean and reusable parts built inside independent React modules for maximum scalability." },
    { title: "Fully Responsive", desc: "Fluid layouts seamlessly adjusting across mobile, tablet, and desktop screen sizes perfectly." },
    { title: "Design Consistency", desc: "Maintains standard spacing, balanced typography, and a cohesive dark premium accent theme." }
  ];

  return (
    <section id="features" style={{ 
      padding: '4rem 8%', 
      background: '#0d0e12',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '3rem', color: '#fff' }}>Core Implementation</h2>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '2rem', 
        flexWrap: 'wrap',
        width: '100%',
        maxWidth: '1100px'
      }}>
        {cards.map((card, index) => (
          <div key={index} style={{ 
            background: '#13141c', 
            border: '1px solid #222533', 
            padding: '2.5rem 2rem', 
            borderRadius: '12px', 
            flex: '1 1 300px',
            maxWidth: '350px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            transition: 'transform 0.3s ease'
          }}>
            <h3 style={{ color: '#00dc82', marginTop: 0, fontSize: '1.3rem', marginBottom: '1rem' }}>{card.title}</h3>
            <p style={{ color: '#94a3b8', lineHeight: '1.6', fontSize: '0.95rem' }}>{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;