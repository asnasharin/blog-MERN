import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/store";
import { logout } from "../../features/authSlices";
import { toast } from "react-toastify";

export default function Navbar() {

    const user = useAppSelector((state) => state.auth.user)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout())
        localStorage.removeItem("user")
        toast.success("logged out successfully")
        navigate("/login")
    }
  return (
    <nav className="bg-white shadow-md py-4 px-8 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-3xl font-bold text-gray-900 tracking-tight">
          Blog
        </Link>

        <div className="flex space-x-8 text-base font-medium">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/blogs"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
          >
            Blogs
          </Link>
          { user ? (
            <>
            <Link
            to="/dashboard"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
          >
            Dashboard
          </Link>
          <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 transition"
              >
                Logout
              </button>

            </>
          ) : (
            <Link
            to="/login"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
          >
            Login
          </Link>
          )}
         
        </div>
      </div>
    </nav>
  );
}
