const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { User, Project, Task } = require('./models');

const app = express();
app.use(express.json());
app.use(cors());

// Auth Middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized access' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretkey123');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

// 1. AUTH ROUTES
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'All fields required' });
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword, role: role || 'User' });
  res.status(201).json({ success: true, user: { id: user._id, name, email, role: user.role } });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'supersecretkey123', { expiresIn: '1d' });
  res.json({ success: true, token, user: { id: user._id, name: user.name, role: user.role } });
});

// 2. PROJECT ROUTES (Resource 1 CRUD)
app.get('/api/projects', authenticate, async (req, res) => {
  const projects = await Project.find().populate('owner', 'name email');
  res.json({ success: true, data: projects });
});

app.post('/api/projects', authenticate, async (req, res) => {
  if (!req.body.title) return res.status(400).json({ message: 'Title is required' });
  const project = await Project.create({ title: req.body.title, description: req.body.description, owner: req.user.id });
  res.status(201).json({ success: true, data: project });
});

app.delete('/api/projects/:id', authenticate, async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  await Task.deleteMany({ project: req.params.id });
  res.json({ success: true, message: 'Project and tasks deleted' });
});

// 3. TASK ROUTES (Resource 2 CRUD)
app.get('/api/projects/:projectId/tasks', authenticate, async (req, res) => {
  const tasks = await Task.find({ project: req.params.projectId });
  res.json({ success: true, data: tasks });
});

app.post('/api/projects/:projectId/tasks', authenticate, async (req, res) => {
  if (!req.body.title) return res.status(400).json({ message: 'Task title required' });
  const task = await Task.create({ title: req.body.title, status: req.body.status || 'Pending', project: req.params.projectId });
  res.status(201).json({ success: true, data: task });
});

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/capstone_db')
    .then(() => app.listen(process.env.PORT || 5000, () => console.log('Server running on 5000')))
    .catch(err => console.error(err));
}

module.exports = app;