const axios = require('axios');

const playersDatabase = require('./players.mongo');
const { 
  populate,
  saveInDatabase,
  getAllObjects,
  findObject
} = require('./library/library');

const BALL_DONT_LIE_URL = 'https://balldontlie.io/api/v1/players'


async function getAllPlayers(skip, limit, search) {
  let filter;
  if(search) { // If the user inserts to search by the last or first name we create the filter
    searchRegex = new RegExp(search);
    filter = {
      $or: [
        { first_name: searchRegex },
        { last_name: searchRegex }
      ]
    }
  } else {
    filter = {}
  }

  return await getAllObjects(playersDatabase, filter , 'playerId', skip, limit);
}

async function loadPlayersData() {
  const player = await findPlayer({  //If its already loaded dont papulate it again
    last_name: 'James'
  })

  if(player) {
    console.log('Player data already loaded!');
  } 
  else {
    await populateAllPlayers(1);
  }
}

async function populateAllPlayers(pageNumber) {
  const metaData = await populate(BALL_DONT_LIE_URL, {
    params: {  // Le pasamos los query params
      per_page: 100,
      page: pageNumber
    }
  }, 'Players', mapPlayer);

  const percentage = Math.round(metaData.next_page * 100 / metaData.total_pages);
  console.log(`${percentage}%`);

  if(metaData.next_page) await populateAllPlayers(metaData.next_page);
  else console.log('All players are now downloaded!');
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

function validatePlayer(player) {
  // if(!player.first_name || !player.last_name || player.position)
}

module.exports = {
  getAllPlayers,
  loadPlayersData,
  validatePlayer
}