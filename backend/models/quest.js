// models/Quest.js
const mongoose = require('mongoose');

const questSchema = new mongoose.Schema({
  title: String,
  description: String,
  difficulty: String,
  reward: Number,
  completed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Quest', questSchema);
