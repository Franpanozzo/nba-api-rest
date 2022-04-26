'use strict';
const app = require('./src/app');
const serverless = require('serverless-http');

module.exports.handler = serverless(app);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };

