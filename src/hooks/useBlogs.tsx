
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Blog {
  id: string;
  title: string;
  content: string;
  company: string;
  role: string;
  tags: string[];
  author_id: string;
  created_at: string;
  updated_at: string;
  author?: {
    id: string;
    name: string;
    email: string;
  };
  likes_count?: number;
  comments_count?: number;
  is_liked?: boolean;
  is_bookmarked?: boolean;
}

export const useBlogs = () => {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select(`
          *,
          author:users!blogs_author_id_fkey(id, name, email),
          likes_count:likes(count),
          comments_count:comments(count)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Blog[];
    },
  });
};

export const useBlog = (id: string) => {
  return useQuery({
    queryKey: ['blog', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select(`
          *,
          author:users!blogs_author_id_fkey(id, name, email),
          likes_count:likes(count),
          comments_count:comments(count)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as Blog;
    },
  });
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (blogData: {
      title: string;
      content: string;
      company: string;
      role: string;
      tags: string[];
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('blogs')
        .insert({
          ...blogData,
          author_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      toast({
        title: "Success",
        description: "Blog post created successfully!",
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
