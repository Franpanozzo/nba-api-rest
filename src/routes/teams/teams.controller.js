const { getAllTeams } = require('../../models/teams.model');

function httpGetAllTeams(req, res) {
  res.status(200).json(getAllTeams());
}

module.exports = {
  httpGetAllTeams
}