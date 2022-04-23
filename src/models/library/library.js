const axios = require('axios');

async function populate(url, params, data, mapDoc) {
  console.log(`Downloading ${data} data...`);
  const response = await axios.get(url, params);
  // console.log(response.data.data);
  const teamsDocs = response.data.data;
  
  if(response.status !== 200) {
    console.log('Error with axios request:', response);
    throw new Error(`${data} download failed`);
  }

  teamsDocs.forEach(mapDoc);
  return response.data.meta;  // Los teams noo los usa, entonces que ni lo agarre cuando se retorna
}

async function saveInDatabase(database, filter, obj) {
  await database.findOneAndUpdate(filter, obj, {
    upsert: true
  });
}

async function getAllObjects(database, fieldToSort) {
  return await database.find({}, {
    '__v': 0,
    '_id': 0
  })
  .sort(fieldToSort);
}

async function findObject(database, filter) {
  return await database.findOne(filter, {
    '_id': 0,
    '__v': 0,
  });
}

module.exports = {
  populate,
  saveInDatabase,
  getAllObjects,
  findObject
}