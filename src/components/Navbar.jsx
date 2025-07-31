import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { clearUser } from "../features/user/userSlice";
import {Home,LogOut} from 'lucide-react'

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(clearUser());
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-3xl font-extrabold text-blue-400 tracking-wider">
        BOOKED
      </Link>

      <div className="space-x-6 text-sm sm:text-base flex items-center">
        {user ? (
          <>
            <Link
              to={user.role === "admin" ? "/admin" : "/dashboard"}
              className="bg-yellow-400 text-gray-900 px-3 py-1 rounded hover:bg-yellow-300 transition"
            >
              {user.role === "admin" ? "Admin Panel" : "Dashboard"}
            </Link>
            <Link to="/" className="hover:text-yellow-300">
             <Home className="w-5 h-5" />
              Home
            </Link>
            <button
              onClick={handleLogout}
              className="text-blue-400 hover:text-red-300 transition"
            >
               <LogOut className="w-5 h-5" />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-yellow-300">
              Login
            </Link>
            <Link to="/register" className="hover:text-yellow-300">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
