const express = require('express');
const Datastore = require('nedb');
const colours = [["black", true], ["white", false], ["red", true], ["green", true], ["yellow", false], ["blue", true], ["pink", false], ["gray", false], ["brown", true], ["orange", false], ["purple", true]];
require('dotenv').config();

const app = express();
app.listen(process.env.PORT || 3000, () => console.log('listening at 3000'));
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
  const data = req.body;  // Includes data.upticks and data.col
  database.update({ elem: data.col }, { $inc: { votes: data.upticks } }, {}, function (err, numReplaced) {});
  res.end();
});

app.get('/data', (req, res) => {
  database.find({}, (err, data) => {
    if (err) {
      res.end();
      return;
    }
    res.json(data.slice(data.length-11, data.length));
  });
});
