
import React from 'react';
import Navigation from '../components/Navigation';
import BlogCard from '../components/BlogCard';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const LikedPosts = () => {
  const { user } = useAuth();

  const { data: likedBlogs, isLoading, error } = useQuery({
    queryKey: ['liked-blogs', user?.id],
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

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Sign In</h2>
            <p className="text-gray-600 mb-6">You need to be signed in to view your liked posts.</p>
            <Link to="/login">
              <Button>Sign In</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Error loading liked posts</h2>
            <p className="text-gray-600">Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Liked Posts</h1>
          <p className="text-gray-600">
            Your favorite placement experiences and insights.
          </p>
        </div>

        <div className="space-y-6">
          {likedBlogs && likedBlogs.length > 0 ? (
            likedBlogs.map((blog) => (
              <BlogCard 
                key={blog.id} 
                {...blog}
                likes={blog.likes_count || 0}
                comments={blog.comments_count || 0}
                createdAt={blog.created_at}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No liked posts yet</h3>
              <p className="text-gray-600 mb-6">
                Start exploring and like posts that you find helpful!
              </p>
              <Link to="/">
                <Button>Explore Posts</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LikedPosts;
