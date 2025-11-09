const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/profile/me
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    // req.user is attached by the 'protect' middleware
    res.json(req.user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @desc    Update user profile
// @route   PUT /api/profile/me
// @access  Private
router.put('/me', protect, async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findById(req.user._id).select('+password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields
    user.username = username || user.username;
    user.email = email || user.email;
    if (password) {
      user.password = password; // Hashing is handled by pre-save hook
    }

    const updatedUser = await user.save();
    
    // We don't want to send the password back
    const userResponse = await User.findById(updatedUser._id).select('-password');

    res.json(userResponse);
  } catch (err) {
    console.error(err.message);
    // Handle duplicate email error
    if (err.code === 11000) {
        return res.status(400).json({ message: 'Email already in use' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;