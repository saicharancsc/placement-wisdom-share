import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Heart, MessageCircle, Edit, Trash2, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDeleteBlog } from '@/hooks/useUserBlogs';
import { Blog } from '@/hooks/useBlogs';
import BlogCard from '@/components/BlogCard';

interface MyPostsTabProps {
  userPosts?: Blog[];
}

const MyPostsTab = ({ userPosts }: MyPostsTabProps) => {
  const deletePost = useDeleteBlog();
  const navigate = useNavigate();

  const handleDelete = async (blogId: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      deletePost.mutate(blogId);
    }
  };

  const handleEdit = (blogId: string) => {
    navigate(`/edit/${blogId}`);
  };

  if (!userPosts || userPosts.length === 0) {
    return (
      <div className="text-center py-10 sm:py-12">
        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
          No posts yet
        </h3>
        <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-base">
          Share your placement experience to help others!
        </p>
        <Link to="/create">
          <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">Write Your First Post</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {userPosts.map((post) => (
        <BlogCard 
          key={post.id} 
          {...post}
          likes={post.likes_count || 0}
          comments={post.comments_count || 0}
          createdAt={post.created_at}
          fromTab="my-posts"
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default MyPostsTab;
