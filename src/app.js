const express = require('express');
const morgan = require('morgan');

const api = require('./routes/api');

const app = express();

app.use(morgan('combined'));

app.use(express.json());

app.use('/v1', api);
app.use('/*', (req, res) => {
  res.status(500).json({
    in: 'developmente' 
  })
})

module.exports = app;