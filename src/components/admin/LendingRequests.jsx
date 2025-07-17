import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

const LendingRequests = () => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Lending Requests</h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="border p-2">Request ID</th>
            <th className="border p-2">User ID</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">REQ456</td>
            <td className="border p-2">USR02</td>
            <td className="border p-2">N/A</td>
            <td className="border p-2 text-yellow-600">Pending</td>
            <td className="border p-2">2025-07-17</td>
            <td className="border p-2 space-x-2">
              <button className="text-green-500 hover:text-green-700">
                <FaCheck />
              </button>
              <button className="text-red-500 hover:text-red-700">
                <FaTimes />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LendingRequests;
