import { AppProvider, useApp } from './context/AppContext';
import './App.css';

function MainUI() {
  const { user, items, loading, emptyState, fetchItems } = useApp();

  return (
    <div className="app-container">
      <header>
        <h2>📦 Product Catalog</h2>
        <span>👤 {user.name}</span>
      </header>

      <div className="actions">
        <button onClick={() => fetchItems(false)}>Fetch Products</button>
        <button className="outline" onClick={() => fetchItems(true)}>
          Test Empty State
        </button>
      </div>

      {/* 1. SKELETON LOADER STATE */}
      {loading && (
        <div className="skeleton-container">
          {[1, 2, 3].map((n) => (
            <div key={n} className="skeleton-card">
              <div className="skeleton-line"></div>
              <div className="skeleton-line short"></div>
            </div>
          ))}
        </div>
      )}

      {/* 2. EMPTY STATE */}
      {!loading && emptyState && (
        <div className="empty-state">
          <h3>📭 No Products Found</h3>
          <p>There are no items to display at this moment.</p>
        </div>
      )}

      {/* 3. DATA LOADED STATE */}
      {!loading && !emptyState && (
        <div className="items-list">
          {items.map((item) => (
            <div key={item.id} className="item-card">
              <div>
                <h4>{item.title}</h4>
                <small style={{ color: '#718096' }}>{item.category}</small>
              </div>
              <strong>{item.price}</strong>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainUI />
    </AppProvider>
  );
}