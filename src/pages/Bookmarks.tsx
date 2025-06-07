
import React from 'react';
import Navigation from '../components/Navigation';
import BlogCard from '../components/BlogCard';
import { Bookmark } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Bookmarks = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Mock bookmarked posts data - in real app, fetch from database
  const bookmarkedPosts = [
    {
      id: "3",
      title: "Data Science Interview at Netflix - Complete Guide",
      company: "Netflix",
      role: "Data Scientist",
      author: { name: "Priya Sharma", id: "3", email: "priya@example.com" },
      content: "Detailed walkthrough of Netflix's data science interview process including statistics questions, machine learning concepts, A/B testing scenarios, and coding challenges in Python and SQL.",
      tags: ["Netflix", "Data Science", "Statistics", "Machine Learning", "Python", "SQL"],
      likes: 89,
      comments: 23,
      createdAt: "2024-01-01T00:00:00Z",
      is_liked: false,
      is_bookmarked: true,
      author_id: "3",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z"
    }
  ];

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Bookmark className="w-8 h-8 text-blue-500 fill-current" />
            <h1 className="text-3xl font-bold text-gray-900">Bookmarks</h1>
          </div>
          <p className="text-gray-600">
            Your saved posts for quick reference and future reading.
          </p>
        </div>

        <div className="space-y-6">
          {bookmarkedPosts.length > 0 ? (
            bookmarkedPosts.map((post) => (
              <BlogCard key={post.id} {...post} />
            ))
          ) : (
            <div className="text-center py-12">
              <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookmarks yet</h3>
              <p className="text-gray-600">
                Start bookmarking posts to save them for later!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;
