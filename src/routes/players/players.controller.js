const {
  getAllPlayers
} = require('../../models/players.model');
const { processQueryParams } = require('../../services/query');

async function httpGetAllPlayers(req, res) {
  const { skip, limit, search } = processQueryParams(req.query);
  const players = await getAllPlayers(skip, limit, search)
  return res.status(200).json(players);
}

module.exports = {
  httpGetAllPlayers
}