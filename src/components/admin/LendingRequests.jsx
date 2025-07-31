import React, { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { fetchLendings } from "../../services/api";
import axiosInstance from "../../services/api";

const LendingRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    loadLendingRequests();
  }, []);

  const loadLendingRequests = async () => {
    try {
      const data = await fetchLendings();
      setRequests(data);
    } catch (error) {
      console.error("Error loading lending requests:", error);
    }
  };

  const updateRequestStatus = (id, newStatus) => {
    axiosInstance
      .patch(`lendings/${id}/update_status/`, { status: newStatus })
      .then(() => loadLendingRequests())
      .catch((err) => console.error("Error updating request:", err));
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Lending Requests</h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="border p-2">Request ID</th>
            <th className="border p-2">User ID</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id}>
              <td className="border p-2">{req.id}</td>
              <td className="border p-2">
                {req.user_id || req.user?.id || "Unknown"}
              </td>
              <td
                className={`border p-2 ${
                  req.status === "Approved"
                    ? "text-green-600"
                    : req.status === "Rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {req.status}
              </td>
              <td className="border p-2">
                {req.date || req.created_at || "N/A"}
              </td>
              <td className="border p-2 space-x-2">
                <button
                  className="text-green-500 hover:text-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => updateRequestStatus(req.id, "Approved")}
                  disabled={req.status !== "pending"}
                >
                  <FaCheck />
                </button>
                <button
                  className="text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => updateRequestStatus(req.id, "Rejected")}
                  disabled={req.status !== "pending"}
                >
                  <FaTimes />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LendingRequests;
