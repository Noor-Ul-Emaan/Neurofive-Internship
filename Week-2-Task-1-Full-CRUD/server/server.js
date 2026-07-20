import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory Database
let items = [
  { id: 1, title: 'Learn Full Stack', category: 'Study' },
  { id: 2, title: 'Build CRUD App', category: 'Project' }
];

// 1. READ (Get All Items)
app.get('/api/items', (req, res) => {
  setTimeout(() => {
    res.json(items);
  }, 400);
});

// 2. CREATE (Add New Item)
app.post('/api/items', (req, res) => {
  const { title, category } = req.body;
  if (!title || !category) {
    return res.status(400).json({ error: 'Title and Category are required!' });
  }
  const newItem = {
    id: Date.now(),
    title,
    category
  };
  items.push(newItem);
  setTimeout(() => {
    res.status(201).json(newItem);
  }, 400);
});

// 3. UPDATE (Edit Item)
app.put('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const { title, category } = req.body;
  const itemIndex = items.findIndex((i) => i.id === parseInt(id));

  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found!' });
  }

  items[itemIndex] = { id: parseInt(id), title, category };
  setTimeout(() => {
    res.json(items[itemIndex]);
  }, 400);
});

// 4. DELETE (Remove Item)
app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;
  items = items.filter((i) => i.id !== parseInt(id));
  setTimeout(() => {
    res.json({ message: 'Item deleted successfully' });
  }, 400);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});