import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user] = useState({ name: 'Noor Ul Eman', isLogged: true });
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emptyState, setEmptyState] = useState(false);

  const fetchItems = async (isEmpty = false) => {
    setLoading(true);
    setItems([]);
    const endpoint = isEmpty
      ? 'http://localhost:5000/api/empty-items'
      : 'http://localhost:5000/api/items';

    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      setItems(data.items);
      setEmptyState(data.items.length === 0);
    } catch (err) {
      console.error('Error fetching items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <AppContext.Provider
      value={{ user, items, loading, emptyState, fetchItems }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);