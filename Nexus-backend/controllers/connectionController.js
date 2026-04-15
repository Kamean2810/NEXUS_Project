const Connection = require("../models/connection");
const User = require("../models/user");

// Send Request
exports.sendRequest = async (req, res) => {
  const { receiverId } = req.body;

  try {
    const connection = await Connection.create({
      sender: req.user._id,
      receiver: receiverId,
    });

    res.json(connection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Users (opposite role)
exports.getUsers = async (req, res) => {
  try {
    const role = req.user.role === "investor" ? "entrepreneur" : "investor";

    const users = await User.find({ role }).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Requests
exports.getRequests = async (req, res) => {
  try {
    const requests = await Connection.find({
      receiver: req.user._id,
      status: "pending",
    }).populate("sender", "name email role");

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Accept / Reject
exports.updateRequest = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const connection = await Connection.findById(id);
    connection.status = status;
    await connection.save();

    res.json(connection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};