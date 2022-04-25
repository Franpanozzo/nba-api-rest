const {
  getAllPlayers,
  validatePlayer,
  addNewPlayer
} = require('../../models/players.model');
const { processQueryParams } = require('../../services/query');
const circularJSON = require('circular-json');

async function httpGetAllPlayers(req, res) {
  const { skip, limit, page, search } = processQueryParams(req.query);
  const { players, total_count } = await getAllPlayers(skip, limit, search)
  const total_pages = Math.round(total_count / limit);
  const obj = {
    data: players,
    meta: {
      total_pages,
      current_page: page,
      per_page: limit,
      total_count
    }
  }
  const finalObj = circularJSON.parse(circularJSON.stringify(obj));
  return res.status(200).json(finalObj);
}

async function httpAddNewPlayer(req, res) {
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

module.exports = {
  httpGetAllPlayers,
  httpAddNewPlayer
}