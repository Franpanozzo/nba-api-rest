const express = require('express');

const {
  httpGetAllPlayers,
  httpAddNewPlayer,
  httpDeletePlayer,
} = require('./players.controller');

const playersRouter = express.Router();

playersRouter.get('/', httpGetAllPlayers);
playersRouter.post('/', httpAddNewPlayer);
playersRouter.delete('/:playerId', httpDeletePlayer);

module.exports = playersRouter;
