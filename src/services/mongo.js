const mongoose = require('mongoose');

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
})

mongoose.connection.once('error', (err) => {
  console.log(err);
});

async function mongoConnect(mongoUrl) {
  await mongoose.connect(mongoUrl);
}

module.exports = {
  mongoConnect
}