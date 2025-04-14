import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import CourseCard from '../../components/CourseCard';

const PurchasedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { userToken } = useAuth();

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/purchasedCourses', {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        });
        setCourses(response.data.courses);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching purchased courses:', error);
        setError('Failed to load your courses. Please try again later.');
        setLoading(false);
      }
    };

    if (userToken) {
      fetchPurchasedCourses();
    }
  }, [userToken]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Courses</h1>
      
      {error && <div className="mb-4 text-red-500">{error}</div>}
      
      {loading ? (
        <p>Loading your courses...</p>
      ) : courses.length === 0 ? (
        <div className="text-center py-8">
          <p className="mb-4">You haven't purchased any courses yet.</p>
          <a href="/courses" className="bg-blue-500 text-white px-4 py-2 rounded">Browse Courses</a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <CourseCard 
              key={course._id} 
              course={course} 
              isPurchased={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PurchasedCourses;