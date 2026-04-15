import React, { useState } from "react";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "Kamran",
    bio: "",
    preferences: "",
    image: null,
  });

  const handleUpdate = () => {
    alert("Profile Updated ✅");
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">My Profile 👤</h2>

      <div className="bg-white p-6 rounded shadow max-w-lg">
        
        <input
          className="w-full p-2 border mb-3"
          value={profile.name}
          onChange={(e)=>setProfile({...profile,name:e.target.value})}
        />

        <textarea
          placeholder="Bio"
          className="w-full p-2 border mb-3"
          onChange={(e)=>setProfile({...profile,bio:e.target.value})}
        />

        <textarea
          placeholder="Preferences"
          className="w-full p-2 border mb-3"
          onChange={(e)=>setProfile({...profile,preferences:e.target.value})}
        />

        <input
          type="file"
          className="mb-3"
          onChange={(e)=>setProfile({...profile,image:e.target.files[0]})}
        />

        <button
          onClick={handleUpdate}
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;