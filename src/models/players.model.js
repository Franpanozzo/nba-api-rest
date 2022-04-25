const axios = require('axios');

const playersDatabase = require('./players.mongo');
const { 
  populate,
  saveInDatabase,
  getAllObjects,
  findObject
} = require('./library/library');
const { findTeam } = require('./teams.model');

const BALL_DONT_LIE_URL = 'https://balldontlie.io/api/v1/players'
const POSITIONS = ["G","F","C","G-F","F-C"]

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

async function addNewPlayer(player) {
  const newPlayerId = await getLatestPlayerNumber() + 1;

  playerWithId = {
    ...player,
    playerId: newPlayerId
  }
  await savePlayer(playerWithId);
}

async function getLatestPlayerNumber() {
  const latestPlayer = await playersDatabase
    .findOne()
    .sort('-playerId');
  
  return latestPlayer.playerId;
}

async function validatePlayer(player) {

  if(typeof player !== 'object') return 'We recieve a JSON to post a player'

  if(!player.first_name || !player.last_name || !player.position || !player.team.teamId || !player.team.full_name) {
    return 'Missing required player properties';
  }

  if(Object.keys(player).length > 4 || Object.keys(player.team).length > 2) {
    return 'Unnecesary properties';
  }

  if(validateString(player.first_name) || validateString(player.last_name) || validateString(player.team.full_name)) {
    return 'All the fields should be strings, except for the teamId';
  }

  if(!POSITIONS.includes(player.position)) return `Invalid position - Choose one: ${POSITIONS}`;

  if(!(await findTeam({ teamId: player.team.teamId }))) {
    return 'Not matching team was found in the Id';
  } 
}

function validateString(obj) {
  return typeof obj !== 'string';
} 

module.exports = {
  getAllPlayers,
  loadPlayersData,
  validatePlayer,
  addNewPlayer
}