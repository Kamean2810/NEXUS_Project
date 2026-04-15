const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// --------------------- REGISTER ---------------------
exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      bio: "",              // default empty
      startupHistory: "",   // default empty
      preferences: "",      // default empty
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --------------------- LOGIN ---------------------
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        bio: user.bio,
        startupHistory: user.startupHistory,
        preferences: user.preferences,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --------------------- GET PROFILE ---------------------
exports.getProfile = async (req, res) => {
  if (!req.user) return res.status(404).json({ message: "User not found" });

  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
    bio: req.user.bio,
    startupHistory: req.user.startupHistory,
    preferences: req.user.preferences,
  });
};

// --------------------- UPDATE PROFILE ---------------------
exports.updateProfile = async (req, res) => {
  const user = req.user;

  if (!user) return res.status(404).json({ message: "User not found" });

  const { name, bio, startupHistory, preferences } = req.body;

  user.name = name || user.name;
  user.bio = bio || user.bio;
  user.startupHistory = startupHistory || user.startupHistory;
  user.preferences = preferences || user.preferences;

  try {
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      bio: updatedUser.bio,
      startupHistory: updatedUser.startupHistory,
      preferences: updatedUser.preferences,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};