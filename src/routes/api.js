const express = require('express');

const teamsRouter = require('./teams/teams.router');

const api = express.Router();

api.use('/teams', teamsRouter)
// api.use('/*', (req, res) => {
//   res.status(404)
// })

module.exports = api