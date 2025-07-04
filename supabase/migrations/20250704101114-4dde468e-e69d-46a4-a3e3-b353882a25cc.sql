
-- Drop the existing unique constraint that's too restrictive
ALTER TABLE public.bookmarks DROP CONSTRAINT IF EXISTS bookmarks_user_id_blog_id_key;

-- Add a new unique constraint that allows multiple users to bookmark the same post
-- but prevents the same user from bookmarking the same post multiple times
ALTER TABLE public.bookmarks ADD CONSTRAINT bookmarks_user_blog_unique UNIQUE (user_id, blog_id);
