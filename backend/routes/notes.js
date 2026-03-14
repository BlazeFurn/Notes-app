const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { loadData, saveData } = require('../utils/db');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

router.get('/', (req, res) => {
  const db = loadData();
  const userNotes = db.notes.filter((note) => note.userId === req.user.id);
  res.json(userNotes);
});

router.post('/', (req, res) => {
  const { title, content } = req.body;
  if (!title) return res.status(400).json({ message: 'Title is required' });

  const db = loadData();
  const note = {
    id: uuidv4(),
    userId: req.user.id,
    title,
    content: content || '',
    createdAt: new Date().toISOString()
  };

  db.notes.push(note);
  saveData(db);
  res.status(201).json(note);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const db = loadData();
  const noteIndex = db.notes.findIndex((n) => n.id === id && n.userId === req.user.id);
  if (noteIndex === -1) return res.status(404).json({ message: 'Note not found' });

  const deleted = db.notes.splice(noteIndex, 1)[0];
  saveData(db);
  res.json({ message: 'Note deleted', note: deleted });
});

module.exports = router;
