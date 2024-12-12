// routes/questRoutes.js
const express = require('express');
const router = express.Router();
const Quest = require('../models/Quest');

router.get('/quests', async (req, res) => {
  try {
    const quests = await Quest.find();
    res.json(quests);
  } catch (error) {
    console.error('Error fetching quests:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/complete-quest', async (req, res) => {
  try {
    const { questId } = req.body;
    
    // Find the quest and mark it as completed
    const updatedQuest = await Quest.findByIdAndUpdate(questId, { completed: true }, { new: true });
    
    if (!updatedQuest) {
      return res.status(404).json({ message: 'Quest not found' });
    }
    
    res.json(updatedQuest);
  } catch (error) {
    console.error('Error completing quest:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
