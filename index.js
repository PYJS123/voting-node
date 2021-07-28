const express = require('express');
const Datastore = require('nedb');
const colours = [["black", true], ["white", false], ["red", true], ["green", true], ["yellow", false], ["blue", true], ["pink", false], ["gray", false], ["brown", true], ["orange", false], ["purple", true]];

const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/cols', (req, res) => {
  res.json({
    cols: colours
  });
});

app.post('/postdata', (req, res) => {
  const data = request.body;  // Includes data.upticks and data.col
  db.update({ elem: data.col }, { $inc: { votes: data.upticks } }, { multi: true }, function (err, numReplaced) {});
  res.end();
});
