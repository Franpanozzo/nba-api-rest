const axios = require('axios');

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

module.exports = {
  getAllPlayers
}