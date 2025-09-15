const express = require('express');
const router = express.Router();
const User = require('../models/User'); // ודא שיש מודל כזה

router.get('/stats', async (req, res) => {
  try {
    const users = await User.find({});
    const totalVisits = users.reduce((sum, u) => sum + (u.visits || 0), 0);
    res.json({ users, totalVisits });
  } catch (err) {
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
});

module.exports = router;