import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/courses');
        // Get only the first 3 courses to show as featured
        setFeaturedCourses(response.data.courses.slice(0, 3));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to CourseMaster</h1>
        <p className="text-xl text-gray-600">Discover and learn with our premium courses</p>
        <div className="mt-6">
          <Link to="/courses" className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-medium mr-4">
            Browse All Courses
          </Link>
          <Link to="/user/signup" className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-medium">
            Sign Up Now
          </Link>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Featured Courses</h2>
        {loading ? (
          <p>Loading courses...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map(course => (
              <div key={course._id} className="border rounded-lg overflow-hidden shadow-lg">
                {course.imageLink && (
                  <img src={course.imageLink} alt={course.title} className="w-full h-48 object-cover" />
                )}
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <p className="text-gray-700 mb-4">{course.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">${course.price}</span>
                    <Link to="/courses" className="bg-blue-500 text-white px-4 py-2 rounded">
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="bg-gray-100 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Why Choose CourseMaster?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">Expert Instructors</h3>
            <p>Learn from industry professionals with years of experience</p>
          </div>
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">Flexible Learning</h3>
            <p>Study at your own pace, anytime and anywhere</p>
          </div>
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">Quality Content</h3>
            <p>Access high-quality, up-to-date course materials</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
