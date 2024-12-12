// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  telegramId: Number,
  username: String,
  avatar: String,
  currentQuest: { type: mongoose.Schema.Types.ObjectId, ref: 'Quest' },
  progress: Number,
  completedQuests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quest' }]
});

module.exports = mongoose.model('User', userSchema);
