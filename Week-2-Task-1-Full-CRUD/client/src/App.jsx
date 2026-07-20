import { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'http://localhost:5000/api/items';

function App() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // READ - Fetch items from Backend
  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch data from backend');
      const data = await res.json();
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // CREATE & UPDATE Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !category) return alert('Please fill all fields');

    setLoading(true);
    setError(null);

    try {
      if (editingId) {
        // UPDATE
        const res = await fetch(`${API_URL}/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, category }),
        });
        if (!res.ok) throw new Error('Failed to update item');
      } else {
        // CREATE
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, category }),
        });
        if (!res.ok) throw new Error('Failed to create item');
      }

      setTitle('');
      setCategory('');
      setEditingId(null);
      fetchItems();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // EDIT Pre-fill
  const handleEdit = (item) => {
    setEditingId(item.id);
    setTitle(item.title);
    setCategory(item.category);
  };

  // DELETE
  const handleDelete = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete item');
      fetchItems();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Full CRUD App (Frontend + Backend)</h2>

      {error && <div className="error-msg">❌ {error}</div>}

      {/* Form for Create & Update */}
      <form onSubmit={handleSubmit} className="form-box">
        <input
          type="text"
          placeholder="Item Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {editingId ? 'Update Item' : 'Add Item'}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setTitle('');
              setCategory('');
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Loading State */}
      {loading && <p>⏳ Syncing with Backend...</p>}

      {/* Items List */}
      <div>
        <h3>Items List</h3>
        {items.length === 0 && !loading ? (
          <p>No items found.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="item-card">
              <div>
                <strong>{item.title}</strong> — <em>{item.category}</em>
              </div>
              <div>
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(item)}
                  disabled={loading}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item.id)}
                  disabled={loading}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;