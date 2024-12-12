// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/login', async (req, res) => {
  try {
    const { telegramId } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ telegramId });
    if (existingUser) {
      return res.status(200).json({ message: 'Logged in successfully', userId: existingUser._id });
    }

    // If user doesn't exist, create a new one
    const newUser = new User({ telegramId });
    await newUser.save();
    
    res.status(201).json({ message: 'New user created', userId: newUser._id });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
