const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const passport = require('passport');

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// 🔁 Step 2: Handle Google callback
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    const payload = { user: { id: req.user._id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Redirect back to frontend with token
    res.redirect(`http://localhost:5173/dashboard?token=${token}`);
  }
);

module.exports = router;