
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, Bookmark, Calendar, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Blog } from '@/hooks/useBlogs';
import { useLikeBlog } from '@/hooks/useLikes';
import { useAuth } from '@/hooks/useAuth';
import { usePublicProfile } from '@/hooks/usePublicProfile';
import { useCheckBookmarkStatus, useToggleBookmark } from '@/hooks/useBookmarks';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface BlogCardProps extends Blog {
  likes: number;
  comments: number;
  createdAt: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  title,
  company,
  role,
  author,
  author_id,
  content,
  tags,
  likes,
  comments,
  createdAt,
}) => {
  const { user } = useAuth();
  const { data: authorProfile, isLoading: profileLoading } = usePublicProfile(author_id);
  const { data: isBookmarked = false } = useCheckBookmarkStatus(id);
  const likeMutation = useLikeBlog();
  const bookmarkMutation = useToggleBookmark();
  
  // Check if user has liked this blog
  const { data: isLiked = false } = useQuery({
    queryKey: ['like-status', id, user?.id],
    queryFn: async () => {
      if (!user) return false;
      
      const { data, error } = await supabase
        .from('likes')
        .select('user_id')
        .eq('blog_id', id)
        .eq('user_id', user.id)
        .maybeSingle();
        
      if (error) throw error;
      return !!data;
    },
    enabled: !!user && !!id,
  });

  const [liked, setLiked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(likes);
  const [bookmarked, setBookmarked] = React.useState(false);

  React.useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  React.useEffect(() => {
    setLikeCount(likes);
  }, [likes]);

  React.useEffect(() => {
    setBookmarked(isBookmarked);
  }, [isBookmarked]);

  const handleLike = async () => {
    if (!user) return;
    
    const newLikedState = !liked;
    setLiked(newLikedState);
    setLikeCount(newLikedState ? likeCount + 1 : likeCount - 1);

    try {
      await likeMutation.mutateAsync({ blogId: id, isLiked: liked });
    } catch (error) {
      // Revert on error
      setLiked(liked);
      setLikeCount(likeCount);
    }
  };

  const handleBookmark = async () => {
    if (!user) return;
    
    const newBookmarkedState = !bookmarked;
    setBookmarked(newBookmarkedState);

    try {
      await bookmarkMutation.mutateAsync({ 
        blogId: id, 
        isBookmarked: bookmarked 
      });
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      // Revert on error
      setBookmarked(bookmarked);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  // Get display name and avatar with proper fallbacks
  const displayName = authorProfile?.name || author?.name || 'Anonymous';
  const avatarUrl = authorProfile?.avatar_url;
  const avatarFallback = displayName.charAt(0).toUpperCase();

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Link to={`/profile/${author_id}`}>
              <Avatar className="w-10 h-10 hover:ring-2 hover:ring-blue-200 transition-all cursor-pointer">
                {avatarUrl ? (
                  <AvatarImage 
                    src={avatarUrl} 
                    alt={`${displayName}'s avatar`}
                  />
                ) : null}
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                  {avatarFallback}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <Link to={`/profile/${author_id}`}>
                <p className="font-medium text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">
                  {displayName}
                </p>
              </Link>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(createdAt)}</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBookmark}
            disabled={bookmarkMutation.isPending || !user}
            className={`${bookmarked ? 'text-blue-600' : 'text-gray-400'} hover:text-blue-600`}
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-gray-500" />
            <span className="font-semibold text-gray-900">{company}</span>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              {role}
            </Badge>
          </div>
          
          <Link to={`/blog/${id}`}>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
              {title}
            </h3>
          </Link>
          
          <p className="text-gray-600 line-clamp-3 leading-relaxed">
            {content.substring(0, 200)}...
          </p>
          
          <div className="flex flex-wrap gap-2">
            {tags?.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                disabled={likeMutation.isPending || !user}
                className={`${liked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
              >
                <Heart className={`w-4 h-4 mr-1 ${liked ? 'fill-current' : ''}`} />
                {likeCount}
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-500">
                <MessageCircle className="w-4 h-4 mr-1" />
                {comments}
              </Button>
            </div>
            
            <Link to={`/blog/${id}`}>
              <Button variant="outline" size="sm" className="group-hover:bg-blue-50 group-hover:border-blue-200">
                Read More
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
