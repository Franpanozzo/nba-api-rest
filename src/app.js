const express = require('express');
const morgan = require('morgan')

const api = require('./routes/api');

const app = express();

app.use(morgan('combined'));

app.use(express.json());

// app.use('/v1', api);
app.get('/', (req, res) => {
  res.json({
    check: 'All good'
  })
});

module.exports = app;