const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');
const activities = require('../models/activityStore');
const openai = require('../config/openaiConfig');

const router = express.Router();

router.post('/chat', authenticateToken, async (req, res) => {
  try {
    const { message } = req.body;
    const username = req.user.username;
    const today = new Date().toISOString().slice(0, 10);
    const userActivity = activities[username]?.[today] || [];

    let response = '';
    if (message.toLowerCase().includes('productive') || message.toLowerCase().includes('activity')) {
      if (userActivity.length === 0) {
        response = "I don't see any activity data for today yet. Start recording your screen in the Settings page to get productivity insights!";
      } else {
        const hours = Math.floor(userActivity.length / 3600);
        response = `Based on your activity data today, you've been active for approximately ${hours} hours with ${userActivity.length} screen captures. This shows consistent engagement with your work!`;
      }
    } else if (message.toLowerCase().includes('pattern') || message.toLowerCase().includes('trend')) {
      response = "I can see your activity patterns in the Dashboard. The charts show your productivity distribution throughout the day. Check the Dashboard for detailed visualizations!";
    } else if (message.toLowerCase().includes('help') || message.toLowerCase().includes('how')) {
      response = "I can help you analyze your productivity data! Try asking about your activity patterns, productive hours, or how to improve your workflow. You can also check the Dashboard for visual insights.";
    } else {
      response = `You asked: \"${message}\". I'm here to help you understand your productivity data. You have ${userActivity.length} activity frames recorded today. Ask me about your productivity patterns or check the Dashboard for detailed insights!`;
    }

    res.json({ response });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ response: 'Sorry, I encountered an error. Please try again.' });
  }
});

module.exports = router;

