import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock database for global state fetching
const products = [
  { id: 1, title: 'React Masterclass Course', category: 'Web Dev', price: '$49' },
  { id: 2, title: 'Node.js & Express Guide', category: 'Backend', price: '$39' },
  { id: 3, title: 'UI/UX Design Essentials', category: 'Design', price: '$29' },
];

// GET Products route with intentional 2-second delay for Skeleton Loader testing
app.get('/api/items', (req, res) => {
  setTimeout(() => {
    res.json({ success: true, items: products });
  }, 2000); // 2 seconds artificial delay
});

// GET Empty route to test Empty States UI
app.get('/api/empty-items', (req, res) => {
  setTimeout(() => {
    res.json({ success: true, items: [] });
  }, 2000);
});

app.listen(PORT, () => {
  console.log(`Global State Server running on http://localhost:${PORT}`);
});