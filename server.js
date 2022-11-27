const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3001;

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/notes.html'))
});

app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) throw err;
      var notes = JSON.parse(data);
      res.json(notes);
    });
  });
  