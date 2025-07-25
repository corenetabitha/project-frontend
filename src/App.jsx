import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserDashboard from './pages/UserDashboard';

function App() {
  return (
    <Router>
      <div className="p-6">
        <nav className="mb-6">
          <Link to="/dashboard" className="text-blue-600 hover:underline text-lg font-medium">
            User Dashboard
          </Link>
        </nav>

    <Routes>
      <Route path="/dashboard" element={<UserDashboard />} />
    </Routes>
  </div>
</Router>
  );
}

export default App;