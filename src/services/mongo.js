const mongoose = require('mongoose');

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
})

mongoose.connection.once('error', (err) => {
  console.log(err);
});

async function mongoConnect(mongoUri) {
  await mongoose.connect(mongoUri);
}

async function mongoDisconnect(mongoUri) {
  await mongoose.disconnect(mongoUri);
}

module.exports = {
  mongoConnect,
  mongoDisconnect
}