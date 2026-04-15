import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Connections = () => {
  const navigate = useNavigate();

  const [callingUser, setCallingUser] = useState(null);
  const [incomingCall, setIncomingCall] = useState(null);

  // TEMP users (backend later)
  const users = [
    { _id: "1", name: "Ali", role: "Investor" },
    { _id: "2", name: "Sara", role: "Entrepreneur" },
  ];

  // Start Call
  const handleCall = (user) => {
    setCallingUser(user.name);

    // simulate call delay
    setTimeout(() => {
      alert(`📞 Connected with ${user.name}`);
      setCallingUser(null);
    }, 2000);
  };

  // Simulate incoming call (for UI demo)
  const simulateIncomingCall = () => {
    setIncomingCall({ name: "Ali" });
  };

  return (
    <>
      <Navbar />

      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Connections 🤝</h2>

          {/* Demo Button */}
          <button
            onClick={simulateIncomingCall}
            className="bg-yellow-400 px-3 py-1 rounded"
          >
            Simulate Call
          </button>
        </div>

        {/* Incoming Call UI */}
        {incomingCall && (
          <div className="bg-green-100 border p-4 rounded mb-4 flex justify-between items-center">
            <p>📞 {incomingCall.name} is calling you...</p>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  alert("Call Accepted ✅");
                  setIncomingCall(null);
                }}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Accept
              </button>

              <button
                onClick={() => setIncomingCall(null)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        )}

        {/* Calling Status */}
        {callingUser && (
          <div className="bg-blue-100 p-3 rounded mb-4">
            📞 Calling {callingUser}...
          </div>
        )}

        {/* Users List */}
        <div className="grid md:grid-cols-2 gap-4">
          {users.map((u) => (
            <div
              key={u._id}
              className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-lg">{u.name}</h3>
                <p className="text-gray-500">{u.role}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => navigate("/chat")}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Chat
                </button>

                <button
                  onClick={() => handleCall(u)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Video Call
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Connections;