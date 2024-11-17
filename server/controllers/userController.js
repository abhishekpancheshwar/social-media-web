const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// Register User
exports.registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ username, email, password: hashedPassword });

    await user.save();
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (error) {
    console.error("eroor is register backend side", er);
    
    res.status(500).json({ msg: 'Server error' });
  }
});

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};


// Delete a user by ID
exports.deleteUser = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
  
      // Check if user exists
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      // Delete all posts by the user
      await Post.deleteMany({ user: req.user.id });
  
      // Delete the user
      await user.remove();
      res.json({ msg: 'User account and all associated posts removed' });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: 'Server error' });
    }
  };