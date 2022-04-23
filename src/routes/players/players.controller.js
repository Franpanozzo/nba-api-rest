const {
  getAllPlayers
} = require('../../models/players.model');

async function httpGetAllPlayers(req, res) {
  return res.status(200).json(await getAllPlayers());
}

module.exports = {
  httpGetAllPlayers
}