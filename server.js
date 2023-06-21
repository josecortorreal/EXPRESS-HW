const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


// HTML Routes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API Routes
app.get('/api/notes', (req, res) => {
  const notesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json')));
  res.json(notesData);
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4();

  const notesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json')));
  notesData.push(newNote);
  fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(notesData));

  res.json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;

  const notesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json')));
  const updatedNotesData = notesData.filter((note) => note.id !== noteId);
  fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(updatedNotesData));

  res.sendStatus(200);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
