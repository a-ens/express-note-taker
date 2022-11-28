// Importing some of the required modules
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

// POST route--for adding notes created by the user
app.post('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    var notes = JSON.parse(data);
    let userNote = req.body;
    userNote.id = Math.floor(Math.random() * 5000);
    notes.push(userNote);
  fs.writeFile('./db/db.json', JSON.stringify(notes), (err, data) => {
      res.json(userNote);
  });
  }); 
});

// GET route for individual notes by id
app.get('api/notes/:id', (req, res) =>{
  res.json(notes[req.params.id]);
});

// Get route for retrieving all notes from the db
app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    var notes = JSON.parse(data);
    res.json(notes);
  });
});

// Get route for rendering the 'notes' page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/notes.html'))
});

// GET route for rendering landing page
app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, '/index.html'));
});   

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});