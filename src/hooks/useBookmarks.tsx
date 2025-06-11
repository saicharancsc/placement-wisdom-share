
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Blog } from './useBlogs';

export const useBookmarks = () => {
  return useQuery({
    queryKey: ['bookmarks'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('bookmarks')
        .select(`
          id,
          created_at,
          blog:blogs(
            *,
            author:users!blogs_author_id_fkey(id, name, email),
            likes_count:likes(count),
            comments_count:comments(count)
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      return data?.map(bookmark => ({
        ...bookmark.blog,
        likes_count: bookmark.blog.likes_count?.[0]?.count || 0,
        comments_count: bookmark.blog.comments_count?.[0]?.count || 0,
        is_bookmarked: true,
      })) as Blog[];
    },
  });
};

export const useToggleBookmark = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ blogId, isBookmarked }: { blogId: string; isBookmarked: boolean }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      if (isBookmarked) {
        // Remove bookmark
        const { error } = await supabase
          .from('bookmarks')
          .delete()
          .eq('user_id', user.id)
          .eq('blog_id', blogId);

        if (error) throw error;
      } else {
        // Add bookmark
        const { error } = await supabase
          .from('bookmarks')
          .insert({
            user_id: user.id,
            blog_id: blogId,
          });

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      queryClient.invalidateQueries({ queryKey: ['blog'] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useCheckBookmarkStatus = (blogId: string) => {
  return useQuery({
    queryKey: ['bookmark-status', blogId],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;

      const { data, error } = await supabase
        .from('bookmarks')
        .select('id')
        .eq('user_id', user.id)
        .eq('blog_id', blogId)
        .maybeSingle();

      if (error) throw error;
      return !!data;
    },
    enabled: !!blogId,
  });
};
