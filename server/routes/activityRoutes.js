const express = require('express');
const multer = require('multer');
const authenticateToken = require('../middleware/authMiddleware');
const activities = require('../models/activityStore');

const router = express.Router();
const upload = multer();

router.post('/activity', authenticateToken, (req, res) => {
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

router.get('/activity/:date', authenticateToken, (req, res) => {
  const username = req.user.username;
  const date = req.params.date;
  const data = activities[username]?.[date] || [];
  res.json({ frames: data });
});

router.post('/activity/frame', authenticateToken, upload.single('frame'), (req, res) => {
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

module.exports = router;

