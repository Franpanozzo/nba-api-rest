const axios = require('axios');

const playersDatabase = require('./players.mongo');
const { 
  populate,
  saveInDatabase,
  getAllObjects
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
  console.log('Downloading players data...');
  const response = await axios.get(BALL_DONT_LIE_URL);
  // console.log(response.data.data);
  const playersDocs = response.data.data;
  
  if(response.status !== 200) {
    console.log('Error with axios request:', response);
    throw new Error('PLayers data download failed');
  }

  return playersDocs;
}

async function loadPlayersData() {
  await populate(BALL_DONT_LIE_URL, 'Players', mapPlayer);
}

async function mapPlayer(playerDoc) {
  const player = {
    playerId: playerDoc.id,
    first_name: playerDoc.first_name,
    last_name: playerDoc.last_name,
    position: playerDoc.position,
    team: {
      teamId: playerDoc.team.id,
      full_name: playerDoc.team.id
    }
  }

  await savePlayer(player);
}

async function savePlayer(player) {
  await saveInDatabase(playersDatabase, {
    playerId: player.playerId
  }, player)
}

module.exports = {
  getAllPlayers
}