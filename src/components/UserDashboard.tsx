
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
  Home,
  User,
  MapPin,
  Globe
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useUserBlogs, useDeleteBlog } from '@/hooks/useUserBlogs';
import { useProfile } from '@/hooks/useProfile';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import EditProfileDialog from './EditProfileDialog';
import BlogCard from './BlogCard';

const UserDashboard = () => {
  const { user } = useAuth();
  const { data: userPosts, isLoading } = useUserBlogs();
  const { data: profile } = useProfile();
  const { data: bookmarkedPosts } = useBookmarks();
  const deletePost = useDeleteBlog();
  const navigate = useNavigate();

  // Fetch liked posts
  const { data: likedPosts } = useQuery({
    queryKey: ['liked-posts', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('likes')
        .select(`
          blog_id,
          blogs!inner(
            *,
            author:users!blogs_author_id_fkey(id, name, email),
            likes_count:likes(count),
            comments_count:comments(count)
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      
      return data?.map(like => ({
        ...like.blogs,
        likes_count: like.blogs.likes_count?.[0]?.count || 0,
        comments_count: like.blogs.comments_count?.[0]?.count || 0,
      })) || [];
    },
    enabled: !!user,
  });

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

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    const name = profile?.name || user?.user_metadata?.name || user?.email;
    if (!name) return 'U';
    
    const words = name.split(' ');
    if (words.length >= 2) {
      return `${words[0].charAt(0)}${words[1].charAt(0)}`.toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  const displayName = profile?.name || user?.user_metadata?.name || 'Student';
  const currentAvatar = profile?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${getUserInitials()}&backgroundColor=3b82f6&textColor=ffffff`;

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
      <Card className="mb-8 overflow-hidden shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardContent className="pt-8 pb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-white shadow-xl ring-4 ring-blue-100">
                  <AvatarImage 
                    src={currentAvatar}
                    alt="Profile picture"
                    className="object-cover"
                  />
                  <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute bottom-2 right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
              </div>
              <EditProfileDialog>
                <Button variant="outline" size="sm" className="text-xs">
                  <User className="w-3 h-3 mr-1" />
                  Edit Profile
                </Button>
              </EditProfileDialog>
            </div>
            
            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {displayName}
              </h2>
              <p className="text-lg text-gray-600 mb-1">
                {user?.email}
              </p>
              
              {/* Additional Profile Info */}
              <div className="space-y-1 mb-4">
                {profile?.bio && (
                  <p className="text-gray-500 max-w-md">
                    {profile.bio}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  {profile?.location && (
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {profile.location}
                    </div>
                  )}
                  {profile?.website && (
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 mr-1" />
                      <a 
                        href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {profile.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-6 max-w-md mx-auto md:mx-0">
                <div className="text-center bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-center mb-2">
                    <FileText className="w-5 h-5 text-blue-600 mr-1" />
                    <span className="text-2xl font-bold text-gray-900">{userStats.postsCount}</span>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Posts</p>
                </div>
                
                <div className="text-center bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-center mb-2">
                    <Heart className="w-5 h-5 text-red-500 mr-1" />
                    <span className="text-2xl font-bold text-gray-900">{userStats.totalLikes}</span>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Likes</p>
                </div>
                
                <div className="text-center bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-center mb-2">
                    <MessageCircle className="w-5 h-5 text-purple-600 mr-1" />
                    <span className="text-2xl font-bold text-gray-900">{userStats.totalComments}</span>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Comments</p>
                </div>
              </div>
            </div>
            
            {/* Action Button */}
            <div className="flex flex-col space-y-3">
              <Link to="/create">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                  <FileText className="w-5 h-5 mr-2" />
                  Write New Post
                </Button>
              </Link>
            </div>
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

        {/* Liked Posts */}
        <TabsContent value="liked" className="space-y-4">
          {likedPosts && likedPosts.length > 0 ? (
            <div className="space-y-4">
              {likedPosts.map((post) => (
                <BlogCard 
                  key={post.id} 
                  {...post}
                  likes={post.likes_count || 0}
                  comments={post.comments_count || 0}
                  createdAt={post.created_at}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No liked posts yet
              </h3>
              <p className="text-gray-600 mb-4">
                Posts you like will appear here.
              </p>
              <Link to="/">
                <Button>Explore Posts</Button>
              </Link>
            </div>
          )}
        </TabsContent>

        {/* Bookmarked Posts */}
        <TabsContent value="bookmarked" className="space-y-4">
          {bookmarkedPosts && bookmarkedPosts.length > 0 ? (
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
          ) : (
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
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
