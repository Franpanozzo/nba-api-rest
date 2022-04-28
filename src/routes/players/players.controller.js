const {
  getAllPlayers,
  validatePlayer,
  addNewPlayer,
  existsPlayerWithId,
  deletePlayer
} = require('../../models/players.model');
const { processQueryParams } = require('../../services/query');

async function httpGetAllPlayers(req, res) {
  const { skip, limit, search } = processQueryParams(req.query);
  const players = await getAllPlayers(skip, limit, search)
  return res.status(200).json(players);
}

async function httpAddNewPlayer(req, res) {
  if(req.headers['x-api-key'] !== process.env.API_KEY) {
    return res.status(403).json({
      forbidden: 'You need a special API KEY to do this operation'
    })
  }
  const player = req.body;
  let errorMessage = null;

  if(errorMessage = await validatePlayer(player)) {
    return res.status(400).json({
      error: errorMessage
    })
  }

  await addNewPlayer(player);
  return res.status(201).json(player);
}

async function httpDeletePlayer(req, res) {
  if(req.headers['x-api-key'] !== process.env.API_KEY) {
    return res.status(403).json({
      forbidden: 'You need a special API KEY to do this operation'
    })
  }
  const playerId = +req.params.playerId;

  const existsPlayer = await existsPlayerWithId(playerId);
  if(!existsPlayer) {
    return res.status(404).json({
      error: 'Player not found'
    })
  }

  await deletePlayer(playerId);
  return res.status(200).json({
    ok: `Player ${playerId} succesfully deleted`
  })
}

module.exports = {
  httpGetAllPlayers,
  httpAddNewPlayer,
  httpDeletePlayer
}