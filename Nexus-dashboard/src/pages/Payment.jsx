import React from "react";

const Payment = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Payments 💳</h2>

      <div className="bg-white p-6 rounded shadow max-w-md">
        <input
          type="number"
          placeholder="Enter Amount"
          className="w-full p-2 border mb-3"
        />

        <button className="bg-purple-600 text-white w-full py-2 rounded">
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Payment;