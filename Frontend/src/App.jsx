import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Import all your components
import Home from './pages/Home';
import Courses from './pages/User/Courses';
import Purchases from './pages/User/PurchasedCourses';
import UserSignin from './pages/Auth/UserSignin';
import UserSignup from './pages/Auth/UserSignup';
import AdminSignin from './pages/Auth/AdminSignin';
import Dashboard from './pages/Admin/Dashboard';
import AddCourse from './pages/Admin/AddCourse';
import EditCourse from './pages/Admin/EditCourse';
import Navbar from './components/Navbar';

function App() {
  const { currentUser } = useAuth();

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/signin" replace />;
    }
    return children;
  };

  const AdminRoute = ({ children }) => {
    if (!currentUser || currentUser.role !== 'admin') {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  const PublicRoute = ({ children }) => {
    if (currentUser) {
      return <Navigate to={currentUser.role === 'admin' ? '/admin/dashboard' : '/'} replace />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />

        {/* Auth Routes */}
        <Route path="/signin" element={<PublicRoute><UserSignin /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><UserSignup /></PublicRoute>} />
        <Route path="/admin/signin" element={<PublicRoute><AdminSignin /></PublicRoute>} />

        {/* Protected User Routes */}
        <Route path="/purchases" element={
          <ProtectedRoute>
            <Purchases />
          </ProtectedRoute>
        } />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        } />
        <Route path="/admin/add-course" element={
          <AdminRoute>
            <AddCourse />
          </AdminRoute>
        } />
        <Route path="/admin/edit-course/:id" element={
          <AdminRoute>
            <EditCourse />
          </AdminRoute>
        } />

        {/* 404 Route */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;