
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

const UserDashboard = () => {
  const { user } = useAuth();
  const { data: userPosts, isLoading } = useUserBlogs();
  const { data: bookmarkedPosts } = useBookmarks();

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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <DashboardHeader />
      <ProfileHeader userStats={userStats} />

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

        <TabsContent value="my-posts" className="space-y-4">
          <MyPostsTab userPosts={userPosts} />
        </TabsContent>

        <TabsContent value="liked" className="space-y-4">
          <LikedPostsTab likedPosts={likedPosts} />
        </TabsContent>

        <TabsContent value="bookmarked" className="space-y-4">
          <BookmarkedPostsTab bookmarkedPosts={bookmarkedPosts} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
