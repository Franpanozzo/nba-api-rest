const mongoose = require('mongoose');

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
})

mongoose.connection.once('error', (err) => {
  console.log(err);
});

async function mongoConnect(mongoUri) {
  return await mongoose.connect(mongoUri);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect
}