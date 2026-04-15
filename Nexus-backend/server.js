const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

app.get("/", (req, res) => {
  res.send("API Running...");
});

// Create HTTP server for Socket.IO
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // Replace with frontend URL in production
    methods: ["GET", "POST"],
  },
});

// Map to store userId -> socket.id
const usersMap = new Map();

// Socket.IO events
io.on("connection", (socket) => {
  console.log("⚡ User Connected:", socket.id);

  // Store user ID for signaling
  socket.on("store_user", ({ userId }) => {
    usersMap.set(userId, socket.id);
    socket.userId = userId;
    console.log(`User stored: ${userId} -> ${socket.id}`);
  });

  // Chat room join
  socket.on("join_chat", ({ userId, targetUserId }) => {
    const room = [userId, targetUserId].sort().join("_");
    socket.join(room);
    console.log(`${userId} joined room: ${room}`);
  });

  // Chat message
  socket.on("send_message", ({ userId, targetUserId, message }) => {
    const room = [userId, targetUserId].sort().join("_");
    io.to(room).emit("receive_message", {
      userId,
      message,
      time: new Date().toLocaleTimeString(),
    });
  });

  // ---------------- Video Call Signaling ----------------
  socket.on("call_user", ({ userToCall, signalData, from, name }) => {
    const targetSocketId = usersMap.get(userToCall);
    if (targetSocketId) {
      io.to(targetSocketId).emit("receive_call", { signal: signalData, from, name });
      console.log(`Call from ${from} to ${userToCall}`);
    }
  });

  socket.on("answer_call", ({ to, signal }) => {
    const targetSocketId = usersMap.get(to);
    if (targetSocketId) {
      io.to(targetSocketId).emit("call_accepted", signal);
      console.log(`Call answered by ${socket.userId} to ${to}`);
    }
  });

  // Cleanup on disconnect
  socket.on("disconnect", () => {
    if (socket.userId) {
      usersMap.delete(socket.userId);
    }
    console.log("❌ User Disconnected:", socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));