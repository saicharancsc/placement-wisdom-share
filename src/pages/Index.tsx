
import React from 'react';
import Navigation from '../components/Navigation';
import BlogCard from '../components/BlogCard';
import { useBlogs } from '@/hooks/useBlogs';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const { data: blogs, isLoading, error } = useBlogs();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Error loading posts</h2>
            <p className="text-gray-600">Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Latest Placement Experiences</h1>
          <p className="text-gray-600">
            Discover interview experiences, tips, and insights from your peers to ace your placement season.
          </p>
        </div>

        <div className="space-y-6">
          {blogs && blogs.length > 0 ? (
            blogs.map((blog) => (
              <BlogCard 
                key={blog.id} 
                {...blog}
                likes={blog.likes_count || 0}
                comments={blog.comments_count || 0}
                createdAt={blog.created_at}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
              <p className="text-gray-600">
                Be the first to share your placement experience!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
