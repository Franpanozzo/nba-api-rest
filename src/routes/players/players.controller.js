const {
  getAllPlayers,
  validatePlayer
} = require('../../models/players.model');
const { processQueryParams } = require('../../services/query');

async function httpGetAllPlayers(req, res) {
  const { skip, limit, search } = processQueryParams(req.query);
  const players = await getAllPlayers(skip, limit, search)
  return res.status(200).json(players);
}

async function httpAddNewPlayer(req, res) {
  const player = req.body;
  let errorMessage = null;

  if(errorMessage = await validatePlayer(player)) {
    return res.status(400).json({
      error: errorMessage
    })
  }

  return res.status(201).json({
    first_name: "Bronny",
    last_name: "James",
    position: "G",
    team: {
      teamId: 26,
      full_name: "Sacramento Kings"
    }
    });
}

module.exports = {
  httpGetAllPlayers,
  httpAddNewPlayer
}