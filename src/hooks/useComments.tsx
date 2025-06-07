
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Comment {
  id: string;
  content: string;
  created_at: string;
  author_id: string;
  blog_id: string;
  author?: {
    id: string;
    name: string;
    email: string;
  };
}

export const useComments = (blogId: string) => {
  return useQuery({
    queryKey: ['comments', blogId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          *,
          author:users!comments_author_id_fkey(id, name, email)
        `)
        .eq('blog_id', blogId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Comment[];
    },
    enabled: !!blogId,
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ content, blogId }: { content: string; blogId: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('comments')
        .insert({
          content,
          blog_id: blogId,
          author_id: user.id,
        })
        .select(`
          *,
          author:users!comments_author_id_fkey(id, name, email)
        `)
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['comments', variables.blogId] });
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      queryClient.invalidateQueries({ queryKey: ['blog', variables.blogId] });
      toast({
        title: "Success",
        description: "Comment posted successfully!",
      });
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
