import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const BookManagement = () => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4"> Book Management</h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="border p-2">Title</th>
            <th className="border p-2">Author</th>
            <th className="border p-2">Genre</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">The Alchemist</td>
            <td className="border p-2">Paulo Coelho</td>
            <td className="border p-2">Fiction</td>
            <td className="border p-2">$10</td>
            <td className="border p-2">30</td>
            <td className="border p-2 space-x-2">
              <button className="text-blue-500 hover:text-blue-700">
                <FaEdit />
              </button>
              <button className="text-red-500 hover:text-red-700">
                <FaTrash />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BookManagement;
