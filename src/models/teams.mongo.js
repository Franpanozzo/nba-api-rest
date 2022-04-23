const mongoose = require('mongoose');

const teamsSchema = new mongoose.Schema({
  teamId: {
    type: String,
    required: true
  },
  abbreviation: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  conference: {
    type: String,
    required: true
  },
  divison: {
    type: String,
    required: true
  },
  full_name: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model('Team', teamsSchema);