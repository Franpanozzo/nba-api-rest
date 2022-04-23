const mongoose = require('mongoose');

const playersSchema = new mongoose.Schema({
  playerId: {
    type: Number,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  team: {  // Puede ser un free agent
    teamId: {
      type: Number,
    },
    full_name: {
      type: String
    }
  }
})

module.exports = mongoose.model('Player', playersSchema);