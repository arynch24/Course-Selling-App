import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CourseCard from '../../components/CourseCard';
import { useAuth } from '../../contexts/AuthContext';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isUserLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('https://course-selling-app-bbup.onrender.com/user/courses');
        setCourses(response.data.courses);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError('Failed to load courses. Please try again later.');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const refreshCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/user/courses');
      setCourses(response.data.courses);
    } catch (error) {
      console.error('Error refreshing courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchaseClick = () => {
    if (!isUserLoggedIn) {
      navigate('/user/signin');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Available Courses</h1>
      
      {error && <div className="mb-4 text-red-500">{error}</div>}
      
      {loading ? (
        <p>Loading courses...</p>
      ) : courses.length === 0 ? (
        <p>No courses available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <CourseCard 
              key={course._id} 
              course={course} 
              onPurchaseClick={handlePurchaseClick}
              onRefresh={refreshCourses}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;