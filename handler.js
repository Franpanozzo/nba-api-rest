'use strict';
const app = require('./src/app');
const serverless = require('serverless-http');
const { mongoConnect } = require('./src/services/mongo');

require('dotenv').config();

async function esperarDB() {
  await mongoConnect(process.env.MONGO_URL);
}

async function conectarDB() {
  await esperarDB();
}

module.exports.handler = (conectarDB()) ? serverless(app) : null;