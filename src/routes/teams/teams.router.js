const express = require('express');

const {
  httpGetAllTeams
} = require('./teams.controller');

const teamsRouter = express.Router();

teamsRouter.get('/', httpGetAllTeams);

module.exports = teamsRouter;