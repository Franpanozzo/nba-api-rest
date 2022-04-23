const { 
  getAllTeams,
  teamWithId,
  findTeam
} = require('../../models/teams.model');

async function httpGetAllTeams(req, res) {
  res.status(200).json(await getAllTeams());
}

async function httpGetTeam(req, res) {
  const teamId = +req.params.teamId;

  const team = await teamWithId(teamId);
  if(!team) {
    res.status(404).json({
      error: 'Team not found'
    });
  }
  
  res.status(200).json(team);
}

module.exports = {
  httpGetAllTeams,
  httpGetTeam
}