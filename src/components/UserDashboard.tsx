
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Heart, 
  Bookmark, 
  FileText, 
  Eye, 
  MessageCircle, 
  Calendar,
  Edit,
  Trash2,
  Home
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useUserBlogs, useDeleteBlog } from '@/hooks/useUserBlogs';
import { Loader2 } from 'lucide-react';

const UserDashboard = () => {
  const { user } = useAuth();
  const { data: userPosts, isLoading } = useUserBlogs();
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

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </div>
    );
  }

  const userStats = {
    postsCount: userPosts?.length || 0,
    totalLikes: userPosts?.reduce((sum, post) => sum + (post.likes_count || 0), 0) || 0,
    totalComments: userPosts?.reduce((sum, post) => sum + (post.comments_count || 0), 0) || 0,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-6">
        <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
          <Home className="w-5 h-5" />
          <span className="font-medium">Back to Home</span>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
        <div></div> {/* Spacer for center alignment */}
      </div>

      {/* Profile Header */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="text-2xl">
                {user?.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {user?.user_metadata?.name || user?.email}
              </h2>
              <p className="text-gray-600 mb-4">
                Sharing placement experiences to help peers succeed
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <FileText className="w-5 h-5 text-blue-600 mr-1" />
                    <span className="text-2xl font-bold text-gray-900">{userStats.postsCount}</span>
                  </div>
                  <p className="text-sm text-gray-600">Posts</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Heart className="w-5 h-5 text-red-600 mr-1" />
                    <span className="text-2xl font-bold text-gray-900">{userStats.totalLikes}</span>
                  </div>
                  <p className="text-sm text-gray-600">Likes</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <MessageCircle className="w-5 h-5 text-purple-600 mr-1" />
                    <span className="text-2xl font-bold text-gray-900">{userStats.totalComments}</span>
                  </div>
                  <p className="text-sm text-gray-600">Comments</p>
                </div>
              </div>
            </div>
            
            <Link to="/create">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Write New Post
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Content Tabs */}
      <Tabs defaultValue="my-posts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100">
          <TabsTrigger value="my-posts" className="data-[state=active]:bg-white">
            My Posts
          </TabsTrigger>
          <TabsTrigger value="liked" className="data-[state=active]:bg-white">
            Liked Posts
          </TabsTrigger>
          <TabsTrigger value="bookmarked" className="data-[state=active]:bg-white">
            Bookmarked
          </TabsTrigger>
        </TabsList>

        {/* My Posts */}
        <TabsContent value="my-posts" className="space-y-4">
          {userPosts && userPosts.length > 0 ? (
            userPosts.map((post) => (
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
            ))
          ) : (
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
          )}
        </TabsContent>

        {/* Liked Posts - Placeholder for now */}
        <TabsContent value="liked" className="space-y-4">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No liked posts yet
            </h3>
            <p className="text-gray-600">
              Posts you like will appear here.
            </p>
          </div>
        </TabsContent>

        {/* Bookmarked Posts - Placeholder for now */}
        <TabsContent value="bookmarked" className="space-y-4">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No bookmarked posts yet
            </h3>
            <p className="text-gray-600">
              Posts you bookmark will appear here.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
