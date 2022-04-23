const mongoose = require('mongoose');

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
})

mongoose.connection.once('error', (err) => {
  console.log(err);
});

async function mongoConnect() {
  await mongoose.connect(process.env.MONGO_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect(process.env.MONGO_URL);
}

module.exports = {
  mongoConnect,
  mongoDisconnect
}