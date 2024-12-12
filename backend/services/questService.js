// services/questService.js
const Quest = require('../models/Quest');

async function generateQuest() {
    // Generate a random quest based on difficulty levels
    const difficulties = ['easy', 'medium', 'hard'];
    const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
    
    const newQuest = new Quest({
        title: `The ${difficulty} Lumberjack Challenge`,
        description: `Cut down trees faster than your opponent!`,
        difficulty,
        reward: Math.floor(100 + Math.random() * 200),
        completed: false
    });
    
    await newQuest.save();
    
    return newQuest;
}

module.exports = { generateQuest };
