import React, { useState } from "react";
import Navbar from "../components/Navbar";

const Chat = () => {
  const [message, setMessage] = useState("");

  return (
    <>
      <Navbar />

      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-xl mb-4 font-bold">Chat</h2>

        <div className="bg-white h-80 p-4 rounded shadow mb-4 overflow-y-auto">
          <p><b>Ali:</b> Hello 👋</p>
          <p className="text-right"><b>You:</b> Hi!</p>
        </div>

        <div className="flex gap-2">
          <input
            className="flex-1 p-2 border rounded"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button className="bg-blue-600 text-white px-4 rounded">
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Chat;