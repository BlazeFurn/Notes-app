const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { loadData, saveData } = require('../utils/db');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are required' });
  }

  const db = loadData();
  const exists = db.users.find((user) => user.email === email.toLowerCase());
  if (exists) return res.status(409).json({ message: 'Email already in use' });

  const hashed = await bcrypt.hash(password, 12);
  const newUser = {
    id: uuidv4(),
    name,
    email: email.toLowerCase(),
    passwordHash: hashed,
    createdAt: new Date().toISOString()
  };

  db.users.push(newUser);
  saveData(db);

  const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET || 'supersecretkey', { expiresIn: '12h' });
  return res.status(201).json({ token, user: { id: newUser.id, name: newUser.name, email: newUser.email, createdAt: newUser.createdAt } });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

  const db = loadData();
  const user = db.users.find((item) => item.email === email.toLowerCase());
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'supersecretkey', { expiresIn: '12h' });
  return res.json({ token, user: { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt } });
});

router.get('/me', authMiddleware, (req, res) => {
  const db = loadData();
  const user = db.users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  return res.json({ id: user.id, name: user.name, email: user.email, createdAt: user.createdAt });
});

module.exports = router;
