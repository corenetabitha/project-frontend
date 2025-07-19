import React from "react";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
        <p className="mb-2">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="mb-2">
          <strong>Role:</strong> {user.role}
        </p>
        <p className="text-gray-500 text-sm mt-4">
          Profile update coming soon...
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
