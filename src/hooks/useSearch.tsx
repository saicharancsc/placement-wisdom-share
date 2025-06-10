
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Blog } from './useBlogs';

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery.trim()) {
        return [];
      }

      const { data, error } = await supabase
        .from('blogs')
        .select(`
          *,
          author:users!blogs_author_id_fkey(id, name, email),
          likes_count:likes(count),
          comments_count:comments(count)
        `)
        .or(`title.ilike.%${debouncedQuery}%,company.ilike.%${debouncedQuery}%,college.ilike.%${debouncedQuery}%,role.ilike.%${debouncedQuery}%,content.ilike.%${debouncedQuery}%`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      return data?.map(blog => ({
        ...blog,
        likes_count: blog.likes_count?.[0]?.count || 0,
        comments_count: blog.comments_count?.[0]?.count || 0,
      })) as Blog[];
    },
    enabled: !!debouncedQuery.trim(),
  });

  return {
    searchQuery,
    setSearchQuery,
    searchResults: searchResults || [],
    isSearching: isLoading,
    hasSearchQuery: !!debouncedQuery.trim(),
  };
};
