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

// module.exports.handler = async (event) => {
//   await mongoConnect(process.env.MONGO_URL);
//   console.log('Ya estamos coenctados!');
//   return serverless(app);
// }

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };

