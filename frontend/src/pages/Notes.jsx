import { useEffect, useState } from 'react';
import { createNote, deleteNote, getNotes } from '../services/api';

export default function Notes({ token }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      const data = await getNotes(token);
      setNotes(data);
    } catch (err) {
      setError('Failed to load notes');
    }
  };

  useEffect(() => { load(); }, [token]);

  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await createNote(token, { title: title.trim(), content: content.trim() });
      setTitle('');
      setContent('');
      load();
    } catch (err) {
      setError('Could not create note');
    }
  };

  const remove = async (id) => {
    try {
      await deleteNote(token, id);
      setNotes(notes.filter((note) => note.id !== id));
    } catch (err) {
      setError('Delete failed');
    }
  };

  return (
    <div>
      <h2>Your Notes</h2>
      <form onSubmit={submit} style={{ marginBottom: '1rem' }}>
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label>Content</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={4} />
        <button type="submit">Add Note</button>
      </form>
      {error && <div className="alert">{error}</div>}

      {notes.map((note) => (
        <div key={note.id} className="note-card">
          <h3>{note.title}</h3>
          <p>{note.content || <em>No content</em>}</p>
          <small>{new Date(note.createdAt).toLocaleString()}</small>
          <br />
          <button onClick={() => remove(note.id)}>Delete</button>
        </div>
      ))}
      {notes.length === 0 && <p>No notes yet. Create your first note above.</p>}
    </div>
  );
}
