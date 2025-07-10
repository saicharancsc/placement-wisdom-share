import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage, getInitial } from '@/components/ui/avatar';
import { FileText, Heart, MessageCircle, MapPin, Globe, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import EditProfileDialog from '../EditProfileDialog';

interface ProfileHeaderProps {
  userStats: {
    postsCount: number;
    totalLikes: number;
    totalComments: number;
  };
}

const ProfileHeader = ({ userStats }: ProfileHeaderProps) => {
  const { user } = useAuth();
  const { data: profile } = useProfile();

  const displayName = profile?.name || user?.user_metadata?.name || 'Student';
  const currentAvatar = profile?.avatar_url || undefined;

  return (
    <Card className="mb-6 sm:mb-8 overflow-hidden shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
      <CardContent className="pt-6 sm:pt-8 pb-4 sm:pb-6">
        <div className="flex flex-row items-center space-x-2 sm:space-x-8 overflow-x-auto w-full">
          {/* Avatar Section */}
          <div className="flex flex-col items-center space-y-2 sm:space-y-4 flex-shrink-0">
            <div className="relative">
              <Avatar className="w-16 h-16 sm:w-32 sm:h-32 border-4 border-white shadow-xl ring-4 ring-blue-100">
                <AvatarFallback className="text-lg sm:text-3xl font-bold bg-blue-600 text-white">
                  {getInitial(profile?.name, user?.email)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute bottom-2 right-2 bg-green-500 w-4 h-4 sm:w-6 sm:h-6 rounded-full border-2 border-white"></div>
            </div>
            <EditProfileDialog>
              <Button variant="outline" size="sm" className="text-xs">
                <User className="w-3 h-3 mr-1" />
                Edit Profile
              </Button>
            </EditProfileDialog>
          </div>
          
          {/* Profile Info */}
          <div className="flex-1 text-left min-w-[180px]">
            <h2 className="text-base sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
              {displayName}
            </h2>
            <p className="text-xs sm:text-lg text-gray-600 mb-1">
              {user?.email}
            </p>
            {/* Additional Profile Info */}
            <div className="space-y-1 mb-2 sm:mb-4">
              {profile?.bio && (
                <p className="text-gray-500 max-w-md text-xs sm:text-base mx-auto md:mx-0">
                  {profile.bio}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
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
            <div className="grid grid-cols-3 gap-2 sm:gap-6 max-w-xs sm:max-w-md">
              <div className="text-center bg-white rounded-xl p-2 sm:p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-center mb-1 sm:mb-2">
                  <FileText className="w-4 h-4 sm:w-5 h-5 text-blue-600 mr-1" />
                  <span className="text-lg sm:text-2xl font-bold text-gray-900">{userStats.postsCount}</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">Posts</p>
              </div>
              <div className="text-center bg-white rounded-xl p-2 sm:p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-center mb-1 sm:mb-2">
                  <Heart className="w-4 h-4 sm:w-5 h-5 text-red-500 mr-1" />
                  <span className="text-lg sm:text-2xl font-bold text-gray-900">{userStats.totalLikes}</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">Likes</p>
              </div>
              <div className="text-center bg-white rounded-xl p-2 sm:p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-center mb-1 sm:mb-2">
                  <MessageCircle className="w-4 h-4 sm:w-5 h-5 text-purple-600 mr-1" />
                  <span className="text-lg sm:text-2xl font-bold text-gray-900">{userStats.totalComments}</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">Comments</p>
              </div>
            </div>
          </div>
          {/* Action Button */}
          <div className="flex flex-col space-y-2 sm:space-y-3 flex-shrink-0 ml-2">
            <Link to="/create">
              {/* <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-base font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                <FileText className="w-4 h-4 sm:w-5 h-5 mr-2" />
                Write New Post
              </Button> */}
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;
