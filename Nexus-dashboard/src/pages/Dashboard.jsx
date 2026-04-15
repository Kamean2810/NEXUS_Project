import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const navigate = useNavigate();

  // TEMP user (later from backend API)
  const user = {
    name: "Kamran",
    role: "Entrepreneur",
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-6">

        {/* 🔷 Welcome Section */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">
              Welcome back, {user.name} 👋
            </h2>
            <p className="text-gray-500 mt-1">
              Role: <span className="font-semibold">{user.role}</span>
            </p>
          </div>

          <button
            onClick={() => navigate("/profile")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit Profile
          </button>
        </div>

        {/* 🟦 Main Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">

          {/* Meetings */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">📅 Meetings</h3>
            <p className="text-gray-500 mb-4">
              Schedule and manage meetings easily
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Schedule
            </button>
          </div>

          {/* Documents */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">📄 Documents</h3>
            <p className="text-gray-500 mb-4">
              Upload, manage & sign documents
            </p>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded">
              Upload
            </button>
          </div>

          {/* Payments */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">💳 Payments</h3>
            <p className="text-gray-500 mb-4">
              Send and track transactions
            </p>
            <button
              onClick={() => navigate("/payment")}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Pay Now
            </button>
          </div>
        </div>

        {/* ⚡ Quick Actions */}
        <div className="bg-white rounded-2xl shadow p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">⚡ Quick Actions</h3>

          <div className="flex flex-wrap gap-4">

            <button
              onClick={() => navigate("/connections")}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              🤝 Find Connections
            </button>

            <button
              onClick={() => navigate("/chat")}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              💬 Open Chat
            </button>

            <button
              onClick={() => navigate("/connections")}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              🎥 Start Video Call
            </button>

            <button
              onClick={() => navigate("/profile")}
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
            >
              👤 My Profile
            </button>
          </div>
        </div>

        {/* 📊 Activity Section (Professional Touch) */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-xl font-semibold mb-4">📊 Recent Activity</h3>

          <ul className="space-y-3 text-gray-600">
            <li>✅ You updated your profile</li>
            <li>📄 Document uploaded successfully</li>
            <li>💳 Payment completed</li>
            <li>🤝 New connection request received</li>
          </ul>
        </div>

      </div>
    </>
  );
};

export default Dashboard;
