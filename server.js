const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Hello World!");
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/notes.html'))
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    let notes = JSON.parse(data);
    res.json(notes);
  });
});

app.get('api/notes/:id', (req, res) =>{
  res.json(notes[req.params.id]);
});

app.post('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    let notes = JSON.parse(data);
    let userNote = req.body;
    userNote.id = Math.floor(Math.random() * 5000);
    notes.push(userNote);
    fs.writeFile('./db/db.json', JSON.stringify(notes), (err, data) => {
      res.json(userNote);
    });
  });
});

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});