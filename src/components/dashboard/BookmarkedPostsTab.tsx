
import React from 'react';
import { Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import BlogCard from '../BlogCard';
import { Blog } from '@/hooks/useBlogs';

interface BookmarkedPostsTabProps {
  bookmarkedPosts?: Blog[];
}

const BookmarkedPostsTab = ({ bookmarkedPosts }: BookmarkedPostsTabProps) => {
  if (!bookmarkedPosts || bookmarkedPosts.length === 0) {
    return (
      <div className="text-center py-12">
        <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No bookmarked posts yet
        </h3>
        <p className="text-gray-600 mb-4">
          Posts you bookmark will appear here.
        </p>
        <Link to="/">
          <Button>Explore Posts</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookmarkedPosts.map((post) => (
        <BlogCard 
          key={post.id} 
          {...post}
          likes={post.likes_count || 0}
          comments={post.comments_count || 0}
          createdAt={post.created_at}
        />
      ))}
    </div>
  );
};

export default BookmarkedPostsTab;
