const express = require("express");
const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
} = require("../controllers/authController");
const { getAllUsers } = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);     // Update user profile
router.get("/users", protect, getAllUsers);        // Get all users except logged-in user
router.get("/all-users", protect, getAllUsers);

module.exports = router;