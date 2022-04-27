// Here there is all the code that is shared from all the models, so our code stays DRY (dont repeat yourself)
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

async function getAllObjects(database, filter, fieldToSort, skip, limit) {
  console.log('Estoy entrando acaaa 2')
  console.log(fieldToSort, skip, limit);
  return await database.find(filter, {
    '__v': 0,
    '_id': 0
  })
  .sort(fieldToSort)
  .skip(skip)
  .limit(limit);
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