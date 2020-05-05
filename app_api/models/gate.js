const mongoose = require('mongoose');

const gateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  profilePhoto: String,
  timestamp: Number,
  question: String
});

mongoose.model('Gate', gateSchema);