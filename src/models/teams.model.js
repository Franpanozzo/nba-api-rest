const axios = require('axios');

const BALL_DONT_LIE_URL = 'https://balldontlie.io/api/v1/teams'

const teams = [
  {
    id: 1,
    abbreviation: "ATL",
    city: "Atlanta",
    conference: "East",
    division: "Southeast",
    full_name: "Atlanta Hawks",
    name: "Hawks"
  },
  {
    id: 23,
    abbreviation: "PHI",
    city: "Philadelphia",
    conference: "East",
    division: "Atlantic",
    full_name: "Philadelphia 76ers",
    name: "76ers"
  }
];

async function getAllTeams() {
  const response = await axios.get(BALL_DONT_LIE_URL)
  // console.log('ESTA ES LA RESPUESTA',response.data.data);

  return response.data.data;
}

// async function loadTeamsData() {

// }

module.exports = {
  getAllTeams
}