const {
  getAllPlayers
} = require('../../models/players.model');
const { getPagination } = require('../../services/query');

async function httpGetAllPlayers(req, res) {
  const { skip, limit } = getPagination(req.query);
  const players = await getAllPlayers(skip, limit)
  return res.status(200).json(players);
}

module.exports = {
  httpGetAllPlayers
}