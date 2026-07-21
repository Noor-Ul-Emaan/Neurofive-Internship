// server.js
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Performance Middlewares
app.use(helmet());
app.use(compression());
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(express.json());

// API Endpoints
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Deployment API is live and fast!' });
});

app.get('/api/products', (req, res) => {
  res.status(200).json({
    success: true,
    data: [
      { id: 1, title: 'Optimized Web App', category: 'Software', price: '$99' },
      { id: 2, title: 'Fullstack Deployment Kit', category: 'DevOps', price: '$149' }
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'production'} mode on port ${PORT}`);
});