import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';

function App() {
  return (
    <div style={{ background: '#0d0e12', minHeight: '100vh' }}>
      <Navbar />
      <Hero />
      <Features />
    </div>
  );
}

export default App;