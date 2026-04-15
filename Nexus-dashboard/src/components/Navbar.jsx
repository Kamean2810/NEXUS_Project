import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // TEMP user (later from backend)
  const user = {
    name: "Kamran",
    image: "https://via.placeholder.com/40",
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const linkClass = (path) =>
    `cursor-pointer ${
      location.pathname === path
        ? "font-bold underline"
        : "hover:underline"
    }`;

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow">
      
      {/* Logo */}
      <h1
        className="font-bold text-xl cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        Nexus 🚀
      </h1>

      {/* Links */}
      <div className="flex items-center gap-6">
        <span
          className={linkClass("/dashboard")}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </span>

        <span
          className={linkClass("/connections")}
          onClick={() => navigate("/connections")}
        >
          Connections
        </span>

        <span
          className={linkClass("/chat")}
          onClick={() => navigate("/chat")}
        >
          Chat
        </span>

        <span
          className={linkClass("/profile")}
          onClick={() => navigate("/profile")}
        >
          Profile
        </span>
      </div>

      {/* User Section */}
      <div className="flex items-center gap-3">
        <span className="hidden md:block">👋 {user.name}</span>

        <img
          src={user.image}
          alt="profile"
          className="w-10 h-10 rounded-full border cursor-pointer"
          onClick={() => navigate("/profile")}
        />

        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;