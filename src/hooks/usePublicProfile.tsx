
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Blog } from './useBlogs';

export interface PublicProfile {
  id: string;
  name?: string;
  bio?: string;
  avatar_url?: string;
  location?: string;
  website?: string;
  created_at?: string;
}

export const usePublicProfile = (userId: string) => {
  return useQuery({
    queryKey: ['public-profile', userId],
    queryFn: async () => {
      if (!userId) return null;
      
      // First try to get from profiles table
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
      }

      // If profile exists, return it
      if (profileData) {
        return profileData as PublicProfile;
      }

      // If no profile, try to get basic info from users table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id, name, email, created_at')
        .eq('id', userId)
        .maybeSingle();

      if (userError) {
        console.error('Error fetching user:', userError);
        throw userError;
      }

      if (!userData) {
        return null;
      }

      // Return user data in profile format
      return {
        id: userData.id,
        name: userData.name,
        created_at: userData.created_at,
      } as PublicProfile;
    },
    enabled: !!userId,
    staleTime: 0, // Always fetch fresh data
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const usePublicUserBlogs = (userId: string) => {
  return useQuery({
    queryKey: ['public-user-blogs', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select(`
          *,
          author:users!blogs_author_id_fkey(id, name, email),
          likes_count:likes(count),
          comments_count:comments(count)
        `)
        .eq('author_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      return data?.map(blog => ({
        ...blog,
        likes_count: blog.likes_count?.[0]?.count || 0,
        comments_count: blog.comments_count?.[0]?.count || 0,
      })) as Blog[];
    },
    enabled: !!userId,
  });
};
