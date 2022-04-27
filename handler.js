'use strict';
const app = require('./src/app');
const serverless = require('serverless-http');
const { mongoConnect } = require('./src/services/mongo');

require('dotenv').config();

async function esperarDB() {
  await mongoConnect(process.env.MONGO_URL);
}

async function conectarDB() {
  console.log('Conectamo');
  await esperarDB();
  console.log('Listooo');
}

console.log('Conectamo perri')

module.exports.handler = (conectarDB()) ? serverless(app) : 'Neverland';

// module.exports.handler = async (event) => {
//   await mongoConnect(process.env.MONGO_URL);
//   console.log('Ya estamos coenctados!');
//   return serverless(app);
// }

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };

