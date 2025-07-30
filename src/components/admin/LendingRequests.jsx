import React, {useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import api from "../../services/api"; 

const LendingRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = () => {
    api.get("lendings/")
      .then((res) => setRequests(res.data))
      .catch((err) => console.error("Error fetching requests:", err));
  };

  const updateRequestStatus = (id, newStatus) => {
    api.patch(`lendings/${id}/`, { status: newStatus })
      .then(() => fetchRequests())
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
              <td className="border p-2">{req.user_id}</td>
              <td className="border p-2 text-yellow-600">{req.status}</td>
              <td className="border p-2">{req.date}</td>
              <td className="border p-2 space-x-2">
                <button
                  className="text-green-500 hover:text-green-700"
                  onClick={() => updateRequestStatus(req.id, "Approved")}
                >
                  <FaCheck />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => updateRequestStatus(req.id, "Rejected")}
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
