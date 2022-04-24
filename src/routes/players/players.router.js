const express = require('express');

const {
  httpGetAllPlayers,
  httpAddNewPlayer
} = require('./players.controller');

const playersRouter = express.Router();

playersRouter.get('/', httpGetAllPlayers);
playersRouter.post('/', httpAddNewPlayer);

module.exports = playersRouter;