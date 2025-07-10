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
      <div className="text-center py-10 sm:py-12">
        <Bookmark className="w-10 h-10 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
          No bookmarked posts yet
        </h3>
        <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-base">
          Posts you bookmark will appear here.
        </p>
        <Link to="/">
          <Button className="w-full sm:w-auto">Explore Posts</Button>
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
          fromTab="bookmarked"
        />
      ))}
    </div>
  );
};

export default BookmarkedPostsTab;
