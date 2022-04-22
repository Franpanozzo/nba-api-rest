const http = require('http');

require('dotenv').config();

const app = require('./app');
const { mongoConnect } = require('./services/mongo');

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect(process.env.MONGO_URL);

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  })
}

startServer();