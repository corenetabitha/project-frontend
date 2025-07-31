import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ username: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("accessToken");

      try {
        const res = await fetch("http://localhost:8000/api/me/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch user profile");

        const data = await res.json();
        setUser(data);
        setFormData({ username: data.username, email: data.email });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg("");
    setError(null);

    const token = localStorage.getItem("accessToken");

    try {
      const res = await fetch("http://localhost:8000/api/me/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      const updated = await res.json();
      setUser(updated);
      setSuccessMsg("Profile updated successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">Error: {error}</p>;
  if (!user) return <p className="text-center mt-10">No user data available.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f0e1] to-[#e8d8c3] p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-[#5c3d2e]">Your Profile</h2>

        <div className="grid grid-cols-1 gap-6 mb-10">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Username</label>
            <p className="text-lg">{user.username}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            <p className="text-lg">{user.email}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Role</label>
            <p className="text-lg capitalize">{user.role}</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-4 text-[#5c3d2e]">Update Info</h3>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full border rounded p-2"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="bg-[#5c3d2e] text-white px-4 py-2 rounded hover:bg-[#472d1f]"
            disabled={saving}
          >
            {saving ? "Saving..." : "Update Profile"}
          </button>
        </form>

        {successMsg && <p className="text-green-600 mt-4">{successMsg}</p>}
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default ProfilePage;
