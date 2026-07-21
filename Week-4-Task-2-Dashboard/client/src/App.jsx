import { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [items, setItems] = useState([]);
  const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    fetch(`${apiBase}/api/products`)
      .then((res) => res.json())
      .then((data) => setItems(data.data || []))
      .catch(() => setItems([
        { id: 1, title: 'Optimized Web App', category: 'Software', price: '$99' },
        { id: 2, title: 'Fullstack Deployment Kit', category: 'DevOps', price: '$149' }
      ]));
  }, [apiBase]);

  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif', maxWidth: '800px', margin: 'auto' }}>
      <header>
        <h1>Production Ready Full-Stack App</h1>
        <p>Deployed with environment variables, performance compression, and SEO essentials.</p>
      </header>

      <section style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px' }}>
        <img 
          src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&auto=format&fit=crop" 
          alt="Developer coding on laptop with performance analytics" 
          width="350"
          height="230"
          style={{ borderRadius: '8px', width: '100%', height: 'auto', maxWidth: '350px' }}
          loading="lazy"
        />
        <div style={{ flex: 1, minWidth: '280px' }}>
          <h2>Performance & SEO Features</h2>
          <ul>
            <li><strong>Meta Tags:</strong> Description & Page Titles configured</li>
            <li><strong>Alt Text:</strong> Included on all media for accessibility</li>
            <li><strong>Compression:</strong> Gzip enabled on API backend</li>
            <li><strong>Responsive Layout:</strong> Mobile & Desktop optimized</li>
          </ul>
        </div>
      </section>

      <section style={{ marginTop: '30px' }}>
        <h2>Live API Products</h2>
        <div style={{ display: 'grid', gap: '15px', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          {items.map((item) => (
            <div key={item.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
              <h3>{item.title}</h3>
              <p>Category: {item.category}</p>
              <p><strong>{item.price}</strong></p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}