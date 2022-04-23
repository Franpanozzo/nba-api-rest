const axios = require('axios');

const teamsDatabase = require('./teams.mongo');

const BALL_DONT_LIE_URL = 'https://balldontlie.io/api/v1/teams'


async function getAllTeams() {
  return await teamsDatabase.find({}, {
    '__v': 0,
    '_id': 0
  });
}

async function loadTeamsData() {
  const firstTeam = await findTeam({
    full_name: 'Atlanta Hawks'
  });

  if(firstTeam) {
    console.log('Teams data already loaded!');
  }
  else {
    await populateTeams();
  }
}

async function populateTeams() {
  console.log('Downloading teams data...');
  const response = await axios.get(BALL_DONT_LIE_URL);
  // console.log(response.data.data);
  const teamsDocs = response.data.data;
  
  if(response.status !== 200) {
    console.log('Error with axios request:', response);
    throw new Error('Teams data download failed');
  }

  teamsDocs.forEach(mapTeam);
}

async function mapTeam(teamDoc) {

  console.log('Team id:', teamDoc.id);
  const team = {
    teamId: teamDoc.id,
    abbreviation: teamDoc.abbreviation,
    city: teamDoc.city,
    conference: teamDoc.conference,
    division: teamDoc.division,
    full_name: teamDoc.full_name,
    name: teamDoc.name
  }

  await saveTeam(team);
}

async function saveTeam(team) {
  await teamsDatabase.findOneAndUpdate({
    full_name: team.full_name
  }, team, {
    upsert: true
  });
}

async function findTeam(filter) {
  return await teamsDatabase.findOne(filter, {
    '_id': 0,
    '__v': 0,
  });
}

async function teamWithId(teamId) {
  return await findTeam({
    teamId: teamId
  });
}

module.exports = {
  getAllTeams,
  loadTeamsData,
  findTeam,
  teamWithId
}