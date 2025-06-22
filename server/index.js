const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');

// Routes
const authRoutes = require('./routes/authRoutes');

// User Activity Store
const activities = {};

// Middleware for JWT Auth
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const upload = multer();

// OpenAI Setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'mock-key'
});

app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));

// Auth Routes
app.use('/api', authRoutes);

// Activity - JSON format
app.post('/api/activity', authenticateToken, (req, res) => {
  try {
    const { frames, date } = req.body;
    const username = req.user.username;
    if (!activities[username]) activities[username] = {};
    if (!activities[username][date]) activities[username][date] = [];
    activities[username][date].push(...frames);
    res.json({ message: 'Activity data saved' });
  } catch (err) {
    console.error('Error in /api/activity:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Activity - Date-based fetch
app.get('/api/activity/:date', authenticateToken, (req, res) => {
  const username = req.user.username;
  const date = req.params.date;
  const data = activities[username]?.[date] || [];
  res.json({ frames: data });
});

// Frame Upload (multipart)
app.post('/api/activity/frame', authenticateToken, upload.single('frame'), (req, res) => {
  try {
    const fileBuffer = req.file?.buffer;
    const username = req.user.username;
    const today = new Date().toISOString().slice(0, 10);

    if (!fileBuffer) {
      return res.status(400).json({ message: 'No frame data received' });
    }

    if (!activities[username]) activities[username] = {};
    if (!activities[username][today]) activities[username][today] = [];

    activities[username][today].push(fileBuffer);
    console.log(`Stored frame for ${username} on ${today}. Total: ${activities[username][today].length}`);

    res.json({ message: 'Frame received and stored' });
  } catch (err) {
    console.error('Error in /api/activity/frame:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Chat Endpoint
app.post('/api/chat', authenticateToken, async (req, res) => {
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
      response = `You asked: "${message}". I'm here to help you understand your productivity data. You have ${userActivity.length} activity frames recorded today. Ask me about your productivity patterns or check the Dashboard for detailed insights!`;
    }

    res.json({ response });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ response: 'Sorry, I encountered an error. Please try again.' });
  }
});

// Keep server alive on tab switch
app.get('/api/ping', (req, res) => {
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
});
