const axios = require('axios');

const playersDatabase = require('./players.mongo');
const { 
  populate,
  saveInDatabase,
  getAllObjects,
  findObject
} = require('./library/library');

const BALL_DONT_LIE_URL = 'https://balldontlie.io/api/v1/players'

const players = [
  {
    playerId: 3,
    first_name: 'Devin',
    last_name: 'Booker',
    position: 'SG',
    team: {
      teamId: 4,
      full_name: 'Phoenix Suns'
    }
  }
]

async function getAllPlayers() {
  return await getAllObjects(playersDatabase, 'playerId');
}

async function loadPlayersData() {
  const player = await findPlayer({  //If its already loaded donde papulate it again
    first_name: 'Ja',
    last_name: 'Morant'
  })

  if(player) {
    console.log('Player data already loaded!');
  } 
  else {
    await populate(BALL_DONT_LIE_URL, 'Players', mapPlayer);
  }
}

async function mapPlayer(playerDoc) {
  const player = {
    playerId: playerDoc.id,
    first_name: playerDoc.first_name,
    last_name: playerDoc.last_name,
    position: playerDoc.position,
    team: {
      teamId: playerDoc.team.id,
      full_name: playerDoc.team.full_name
    }
  }

  await savePlayer(player);
}

async function savePlayer(player) {
  await saveInDatabase(playersDatabase, {
    playerId: player.playerId
  }, player);
}

async function findPlayer(filter) {
  return await findObject(playersDatabase, filter);
}

module.exports = {
  getAllPlayers,
  loadPlayersData
}