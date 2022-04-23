const express = require('express');

const {
  httpGetAllTeams,
  httpGetTeam
} = require('./teams.controller');

const teamsRouter = express.Router();

teamsRouter.get('/', httpGetAllTeams);
teamsRouter.get('/:teamId', httpGetTeam);

module.exports = teamsRouter;