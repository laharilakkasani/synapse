const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. REGISTER NEW USER
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if account already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "An account with this email already exists" });
    }

    // Encrypt (Hash) the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user to MongoDB
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully! Please log in." });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ message: "Server error during registration" });
  }
};

// 2. LOG IN EXISTING USER
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Look up user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if the typed password matches the encrypted database password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT Token (Expires in 2 hours)
    // Use an environment variable for secret key, or a fallback string for local dev
    const JWT_SECRET = process.env.JWT_SECRET || "super_secret_quiz_key_123";
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    // Send the token back to the React client
    return res.status(200).json({
      message: "Login successful!",
      token,
      username: user.username
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error during login" });
  }
};