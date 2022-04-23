const express = require('express');

const {
  httpGetAllPlayers
} = require('./players.controller');

const playersRouter = express.Router();

playersRouter.get('/', httpGetAllPlayers);

module.exports = playersRouter;