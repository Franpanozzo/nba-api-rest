const { getAllTeams } = require('../../models/teams.model');

async function httpGetAllTeams(req, res) {
  res.status(200).json(await getAllTeams());
}

module.exports = {
  httpGetAllTeams
}