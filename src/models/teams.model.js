const axios = require('axios');

const teamsDatabase = require('./teams.mongo');
const { 
  populate,
  saveInDatabase,
  getAllObjects
} = require('./library/library');

const BALL_DONT_LIE_URL = 'https://balldontlie.io/api/v1/teams'


async function getAllTeams() {
  return await getAllObjects(teamsDatabase, 'teamId')
}

async function loadTeamsData() {
  const firstTeam = await findTeam({
    full_name: 'Atlanta Hawks'
  });

  if(firstTeam) {
    console.log('Teams data already loaded!');
  }
  else {
    await populate(BALL_DONT_LIE_URL, 'Teams', mapTeam);
  }
}

async function mapTeam(teamDoc) {
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
  await saveInDatabase(teamsDatabase, {
    full_name: team.full_name
  }, team);
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