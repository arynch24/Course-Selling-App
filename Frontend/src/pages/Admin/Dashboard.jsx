import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import CourseCard from '../../components/CourseCard';

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { adminToken } = useAuth();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/admin/courses', {
          headers: {
            Authorization: `Bearer ${adminToken}`
          }
        });
        setCourses(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError('Failed to load courses. Please try again later.');
        setLoading(false);
      }
    };

    if (adminToken) {
      fetchCourses();
    }
  }, [adminToken]);

  const handleDeleteCourse = async (courseId) => {
    try {
      // Assuming your backend has a delete endpoint
      // If not, you'll need to create one
      await axios.delete(`http://localhost:3000/admin/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${adminToken}`
        }
      });
      
      // Remove the deleted course from state
      setCourses(courses.filter(course => course._id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Failed to delete course');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Link 
          to="/admin/add-course" 
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add New Course
        </Link>
      </div>
      
      {error && <div className="mb-4 text-red-500">{error}</div>}
      
      {loading ? (
        <p>Loading courses...</p>
      ) : courses.length === 0 ? (
        <p>No courses available. Create your first course!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <CourseCard 
              key={course._id} 
              course={course} 
              isAdmin={true}
              onDelete={handleDeleteCourse}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;