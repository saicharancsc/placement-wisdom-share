import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, getInitial } from '@/components/ui/avatar';
import { Heart, MessageCircle, Bookmark, Calendar, Building2, Edit, Trash2 } from 'lucide-react';
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
  fromTab?: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

// Utility function to convert a string to UpperCamelCase
function toUpperCamelCase(str: string) {
  return str
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
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
  fromTab,
  onEdit,
  onDelete,
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

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-200 w-full h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div className="flex items-center space-x-3">
            <Link to={`/profile/${author_id}`}>
              <Avatar className="w-8 h-8 sm:w-10 sm:h-10 hover:ring-2 hover:ring-blue-200 transition-all cursor-pointer">
                <AvatarFallback className="bg-blue-600 text-white font-semibold">
                  {getInitial(authorProfile?.name, author?.email)}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <Link to={`/profile/${author_id}`}>
                <p className="font-medium text-gray-900 hover:text-blue-600 transition-colors cursor-pointer text-xs sm:text-base">
                  {displayName}
                </p>
              </Link>
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(createdAt)}</span>
              </div>
            </div>
          </div>
          {fromTab !== 'my-posts' && fromTab !== 'liked' && fromTab !== 'bookmarked' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBookmark}
              disabled={bookmarkMutation.isPending || !user}
              className={`${bookmarked ? 'text-blue-600' : 'text-gray-400'} hover:text-blue-600 self-end sm:self-auto`}
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
            </Button>
          )}
          {fromTab === 'my-posts' && (onEdit || onDelete) && (
            <div className="flex flex-row gap-2 ml-2">
              {onEdit && (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm"
                  onClick={() => onEdit(id)}
                >
                  <Edit className="w-4 h-4 mr-1" /> Edit
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700 text-xs sm:text-sm"
                  onClick={() => onDelete(id)}
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
                </Button>
              )}
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 pb-6 flex flex-col flex-1 justify-between h-full">
        <div className="space-y-3 flex-1">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="flex items-center space-x-2 min-w-0">
              <Building2 className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <span className="font-semibold text-gray-900 text-xs sm:text-base truncate">{toUpperCamelCase(company)}</span>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs sm:text-sm flex-shrink-0">
              {role}
            </Badge>
          </div>
          
          <Link to={fromTab ? `/blog/${id}?tab=${fromTab}` : `/blog/${id}` }>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
              {toUpperCamelCase(title)}
            </h3>
          </Link>
          
          <p className="text-gray-600 line-clamp-3 leading-relaxed text-xs sm:text-base">
            {content.substring(0, 200)}...
          </p>
          
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {tags?.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 gap-3 mt-auto">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              disabled={likeMutation.isPending || !user}
              className={`${liked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500 text-xs sm:text-sm`}
            >
              <Heart className={`w-4 h-4 mr-1 ${liked ? 'fill-current' : ''}`} />
              {likeCount}
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-500 text-xs sm:text-sm">
              <MessageCircle className="w-4 h-4 mr-1" />
              {comments}
            </Button>
          </div>
          <Link to={`/blog/${id}`} className="w-full sm:w-auto">
            <Button variant="outline" size="sm" className="w-full sm:w-auto group-hover:bg-blue-50 group-hover:border-blue-200">
              Read More
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
