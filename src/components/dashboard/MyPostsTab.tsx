
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Heart, MessageCircle, Edit, Trash2, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDeleteBlog } from '@/hooks/useUserBlogs';
import { Blog } from '@/hooks/useBlogs';

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
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No posts yet
        </h3>
        <p className="text-gray-600 mb-4">
          Share your placement experience to help others!
        </p>
        <Link to="/create">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            Write Your First Post
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {userPosts.map((post) => (
        <Card key={post.id} className="hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="outline">{post.company}</Badge>
                  <Badge variant="secondary">{post.role}</Badge>
                  <Badge className="bg-green-100 text-green-700">
                    published
                  </Badge>
                </div>
                
                <Link to={`/blog/${post.id}`}>
                  <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-2">
                    {post.title}
                  </h3>
                </Link>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(post.created_at).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Heart className="w-4 h-4 mr-1" />
                    {post.likes_count} likes
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {post.comments_count} comments
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2 ml-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEdit(post.id)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-red-600 hover:text-red-700"
                  onClick={() => handleDelete(post.id)}
                  disabled={deletePost.isPending}
                >
                  {deletePost.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MyPostsTab;
