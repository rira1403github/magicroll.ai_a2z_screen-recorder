const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
let users = require('../models/user'); // must be let if you want to push new users

dotenv.config();
const router = express.Router();

// LOGIN route
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });

  res.json({ token });
});

// SIGNUP route
router.post('/signup', (req, res) => {
  const { username, password } = req.body;
  const existingUser = users.find((u) => u.username === username);

  if (existingUser) {
    return res.status(409).json({ message: 'Username already exists' });
  }

  const newUser = { username, password };
  users.push(newUser);

  const token = jwt.sign({ username: newUser.username }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });

  res.status(201).json({ token });
});

module.exports = router;
