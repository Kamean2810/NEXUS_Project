const express = require("express");
const User = require("../models/user");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", protect, async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } }).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;