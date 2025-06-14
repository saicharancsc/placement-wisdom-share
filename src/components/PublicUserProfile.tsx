
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  MessageCircle, 
  Calendar,
  Home,
  MapPin,
  Globe,
  FileText
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { usePublicProfile, usePublicUserBlogs } from '@/hooks/usePublicProfile';
import LoadingSpinner from './LoadingSpinner';
import ErrorState from './ErrorState';

const PublicUserProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const { data: profile, isLoading: profileLoading, error: profileError } = usePublicProfile(userId || '');
  const { data: userPosts, isLoading: postsLoading } = usePublicUserBlogs(userId || '');

  if (profileLoading || postsLoading) {
    return <LoadingSpinner text="Loading user profile..." />;
  }

  if (profileError || !profile) {
    return (
      <ErrorState 
        title="User not found" 
        message="This user profile doesn't exist or may have been removed." 
      />
    );
  }

  const getUserInitials = () => {
    const name = profile?.name;
    if (!name) return 'U';
    
    const words = name.split(' ');
    if (words.length >= 2) {
      return `${words[0].charAt(0)}${words[1].charAt(0)}`.toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  const displayName = profile?.name || 'User';
  const currentAvatar = profile?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${getUserInitials()}&backgroundColor=3b82f6&textColor=ffffff`;

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
        <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
        <div></div>
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
              </div>
            </div>
            
            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {displayName}
              </h2>
              
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
          </div>
        </CardContent>
      </Card>

      {/* User Posts */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Posts by {displayName}</h2>
        
        {userPosts && userPosts.length > 0 ? (
          <div className="space-y-4">
            {userPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline">{post.company}</Badge>
                        <Badge variant="secondary">{post.role}</Badge>
                      </div>
                      
                      <Link to={`/blog/${post.id}`}>
                        <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-2">
                          {post.title}
                        </h3>
                      </Link>
                      
                      <p className="text-gray-600 line-clamp-2 mb-3">
                        {post.content.substring(0, 200)}...
                      </p>
                      
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
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No posts yet
            </h3>
            <p className="text-gray-600">
              {displayName} hasn't shared any placement experiences yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicUserProfile;
