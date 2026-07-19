import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Fetching live data from Public API with Loading & Error handling
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok. API call failed!');
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // 2. Filter logic for Search Bar
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <h2>User Directory (Public API Task)</h2>
      
      {/* Search Input Box */}
      <input
        type="text"
        placeholder="Search users by name..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* 3. Loading State Case */}
      {loading && <p>⏳ Loading live data, please wait...</p>}

      {/* 4. Error State Case */}
      {error && (
        <div className="error-message">
          ❌ {error}. Please check your internet connection and try again.
        </div>
      )}

      {/* 5. Successful Data Display Case */}
      {!loading && !error && (
        <div>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div key={user.id} className="user-card">
                <h4>{user.name}</h4>
                <p>📧 {user.email}</p>
                <p>🌐 {user.website}</p>
              </div>
            ))
          ) : (
            <p>No users found matching "{searchTerm}"</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;