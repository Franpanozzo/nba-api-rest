const express = require('express');

const teamsRouter = require('./teams/teams.router');

const api = express.Router();

api.use('/teams', teamsRouter)

module.exports = api