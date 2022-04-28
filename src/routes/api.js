const express = require('express');

const teamsRouter = require('./teams/teams.router');
const playersRouter = require('./players/players.router');

require('dotenv').config();

const api = express.Router();

api.use('/teams', teamsRouter);
api.use('/players', playersRouter);

module.exports = api