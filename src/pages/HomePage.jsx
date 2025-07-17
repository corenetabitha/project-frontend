// src/pages/Homepage.jsx
import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Homepage</h1>
      
      <Link to="/admin">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Go to Admin Page
        </button>
      </Link>
    </div>
  );
}

export default Homepage;
