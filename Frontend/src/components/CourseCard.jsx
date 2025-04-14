import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CourseCard = ({ course, isPurchased = false, isAdmin = false, onDelete, onRefresh }) => {
  const { userToken } = useAuth();

  const handlePurchase = async () => {
    try {
      await axios.post(`http://localhost:3000/user/courses/${course._id}`, {}, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      });
      alert('Course purchased successfully!');
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error('Error purchasing course:', error);
      alert('Failed to purchase course');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await onDelete(course._id);
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      {course.imageLink && (
        <img 
          src={course.imageLink} 
          alt={course.title} 
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{course.title}</h3>
        <p className="text-gray-700 mb-4">{course.description}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">${course.price}</span>
          
          {isAdmin ? (
            <div className="space-x-2">
              <Link to={`/admin/edit-course/${course._id}`} className="bg-blue-500 text-white px-4 py-2 rounded">Edit</Link>
              <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
            </div>
          ) : isPurchased ? (
            <span className="bg-green-500 text-white px-4 py-2 rounded">Purchased</span>
          ) : (
            <button 
              onClick={handlePurchase} 
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Purchase
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
