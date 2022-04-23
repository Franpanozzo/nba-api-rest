const express = require('express');

const teamsRouter = require('./teams/teams.router');
const playersRouter = require('./players/players.router');

const api = express.Router();

api.use('/teams', teamsRouter);
api.use('/players', playersRouter);
// api.use('/*', (req, res) => {
//   res.status(404)
// })

module.exports = api