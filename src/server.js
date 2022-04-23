const http = require('http');

require('dotenv').config();

const { loadTeamsData } = require('./models/teams.model');
const { loadPlayersData } = require('./models/players.model');

const app = require('./app');
const { mongoConnect } = require('./services/mongo');

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect(process.env.MONGO_URL);
  await loadTeamsData();
  await loadPlayersData();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  })
}

startServer();