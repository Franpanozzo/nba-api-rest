const express = require('express');

const teamsRouter = require('./teams/teams.router');
const playersRouter = require('./players/players.router');
const { mongoConnect } = require('../services/mongo');

require('dotenv').config();

const api = express.Router();
let isConnected;

// api.use(async (req, res, next) => {
//   if(isConnected) {
//     console.log('=> using existing database connection');
//   } 
//   else {
//     console.log('Creating a new DB connection');
//     const db = await mongoConnect(process.env.MONGO_URL);
//     isConnected = db.connections[0].readyState;
//   }
//   next();
// })

api.use('/teams', teamsRouter);
api.use('/players', playersRouter);
// api.use('/*', (req, res) => {
//   res.status(404)
// })

module.exports = api