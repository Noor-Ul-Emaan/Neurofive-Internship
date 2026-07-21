import { useState } from 'react';
import './App.css';

export default function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Item name is required');
      return;
    }
    setItems([...items, { id: Date.now(), name }]);
    setName('');
    setError('');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <h1>Task Manager App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Add Item</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Item List</h2>
      {items.length === 0 ? (
        <p>No items added yet</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}