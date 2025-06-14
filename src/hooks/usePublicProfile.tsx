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
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        throw error;
      }
      
      return data as PublicProfile;
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
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
