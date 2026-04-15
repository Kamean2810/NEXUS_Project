const express = require("express");
const {
  sendRequest,
  getUsers,
  getRequests,
  updateRequest,
} = require("../controllers/connectionController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/users", protect, getUsers);
router.post("/request", protect, sendRequest);
router.get("/requests", protect, getRequests);
router.put("/request/:id", protect, updateRequest);

module.exports = router;