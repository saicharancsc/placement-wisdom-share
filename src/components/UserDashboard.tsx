
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import { useUserBlogs } from '@/hooks/useUserBlogs';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import DashboardHeader from './dashboard/DashboardHeader';
import ProfileHeader from './dashboard/ProfileHeader';
import MyPostsTab from './dashboard/MyPostsTab';
import LikedPostsTab from './dashboard/LikedPostsTab';
import BookmarkedPostsTab from './dashboard/BookmarkedPostsTab';
import { Button } from '@/components/ui/button';
import { useNavigate, useSearchParams } from 'react-router-dom';

const UserDashboard = () => {
  const { user } = useAuth();
  const { data: userPosts, isLoading } = useUserBlogs();
  const { data: bookmarkedPosts } = useBookmarks();
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'my-posts';

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
    <div className="max-w-6xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <div className="flex items-center mb-2 min-h-[40px] w-full">
        <div className="flex-shrink-0">
          <BackToHomeButton />
        </div>
        <div className="flex-1 flex justify-center">
          <h1 className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900 text-center">Dashboard</h1>
        </div>
        <div className="flex-shrink-0 w-[110px] sm:w-[130px] md:w-[160px]" />
      </div>
      <div className="mt-4 sm:mt-8">
        <ProfileHeader userStats={userStats} />
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue={initialTab} className="space-y-4 sm:space-y-6">
        <TabsList className="grid grid-cols-3 bg-gray-100 rounded-lg overflow-x-auto whitespace-nowrap min-w-0 text-xs sm:text-base">
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

        <TabsContent value="my-posts" className="space-y-3 sm:space-y-4">
          <MyPostsTab userPosts={userPosts} />
        </TabsContent>

        <TabsContent value="liked" className="space-y-3 sm:space-y-4">
          <LikedPostsTab likedPosts={likedPosts} />
        </TabsContent>

        <TabsContent value="bookmarked" className="space-y-3 sm:space-y-4">
          <BookmarkedPostsTab bookmarkedPosts={bookmarkedPosts} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Back to Home Button component
function BackToHomeButton() {
  const navigate = useNavigate();
  return (
    <Button
      variant="outline"
      size="sm"
      className="text-xs sm:text-sm px-2 py-1"
      onClick={() => navigate('/')}
    >
      Back to Home
    </Button>
  );
}

export default UserDashboard;
