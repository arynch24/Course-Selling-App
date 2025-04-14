import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { isUserLoggedIn, isAdminLoggedIn, logout } = useAuth();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">CourseMaster</Link>
        <div className="space-x-4">
          <Link to="/" className="text-white">Home</Link>
          <Link to="/courses" className="text-white">All Courses</Link>
          
          {isUserLoggedIn && (
            <>
              <Link to="/user/purchased" className="text-white">My Courses</Link>
              <button onClick={logout} className="text-white">Logout</button>
            </>
          )}
          
          {isAdminLoggedIn && (
            <>
              <Link to="/admin/dashboard" className="text-white">Admin Dashboard</Link>
              <Link to="/admin/add-course" className="text-white">Add Course</Link>
              <button onClick={logout} className="text-white">Logout</button>
            </>
          )}
          
          {!isUserLoggedIn && !isAdminLoggedIn && (
            <>
              <Link to="/user/signin" className="text-white">User Login</Link>
              <Link to="/admin/signin" className="text-white">Admin Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
