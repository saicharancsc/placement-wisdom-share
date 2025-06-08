
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Blog } from './useBlogs';

export const useUserBlogs = () => {
  return useQuery({
    queryKey: ['user-blogs'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('blogs')
        .select(`
          *,
          author:users!blogs_author_id_fkey(id, name, email),
          likes_count:likes(count),
          comments_count:comments(count)
        `)
        .eq('author_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      return data?.map(blog => ({
        ...blog,
        likes_count: blog.likes_count?.[0]?.count || 0,
        comments_count: blog.comments_count?.[0]?.count || 0,
      })) as Blog[];
    },
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (blogId: string) => {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', blogId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-blogs'] });
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      toast({
        title: "Success",
        description: "Blog post deleted successfully!",
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

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (blogData: {
      id: string;
      title: string;
      content: string;
      company: string;
      role: string;
      tags: string[];
    }) => {
      const { id, ...updateData } = blogData;
      const { data, error } = await supabase
        .from('blogs')
        .update({
          ...updateData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-blogs'] });
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      queryClient.invalidateQueries({ queryKey: ['blog'] });
      toast({
        title: "Success",
        description: "Blog post updated successfully!",
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
