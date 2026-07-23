const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'User'], default: 'User' }
});

// Project Schema (Resource 1)
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

// Task Schema (Resource 2 - Related)
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true }
}, { timestamps: true });

module.exports = {
  User: mongoose.model('User', userSchema),
  Project: mongoose.model('Project', projectSchema),
  Task: mongoose.model('Task', taskSchema)
};