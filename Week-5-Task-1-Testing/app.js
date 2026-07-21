// app.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory Database
let items = [
  { id: 1, name: 'Sample Task', category: 'General' }
];

// 1. Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// 2. Get all items
app.get('/api/items', (req, res) => {
  res.status(200).json({ success: true, data: items });
});

// 3. Create item (Happy path + Validation failure)
app.post('/api/items', (req, res) => {
  const { name, category } = req.body;
  if (!name || !category) {
    return res.status(400).json({ success: false, message: 'Name and category are required' });
  }
  const newItem = { id: items.length + 1, name, category };
  items.push(newItem);
  res.status(201).json({ success: true, data: newItem });
});

// 4. Get single item by ID
app.get('/api/items/:id', (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).json({ success: false, message: 'Item not found' });
  }
  res.status(200).json({ success: true, data: item });
});

// 5. Delete item by ID
app.delete('/api/items/:id', (req, res) => {
  const index = items.findIndex((i) => i.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Item not found' });
  }
  items.splice(index, 1);
  res.status(200).json({ success: true, message: 'Item deleted' });
});

module.exports = app;