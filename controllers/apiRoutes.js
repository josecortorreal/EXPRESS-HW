const router = require('express').Router();
const path = require('path');
const dbPath = path.join(__dirname, '../db/db.json');
const fs = require('fs');


router.get('/api/notes', (req, res) => {
    const notesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json')));
    res.json(notesData);
  });
  
  router.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();
  
    const notesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json')));
    notesData.push(newNote);
    fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(notesData));
  
    res.json(newNote);
  });
  
  router.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
  
    const notesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json')));
    const updatedNotesData = notesData.filter((note) => note.id !== noteId);
    fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(updatedNotesData));
  
    res.sendStatus(200);
  });

  module.exports = router;
 