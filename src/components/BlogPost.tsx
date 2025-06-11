
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Heart, MessageCircle, Bookmark, Calendar, Building2, Share2, Loader2 } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlog } from '@/hooks/useBlogs';
import { useLikeBlog } from '@/hooks/useLikes';
import { useAuth } from '@/hooks/useAuth';
import { useComments, useCreateComment } from '@/hooks/useComments';
import { useCheckBookmarkStatus, useToggleBookmark } from '@/hooks/useBookmarks';
import Navigation from './Navigation';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: blogPost, isLoading, error } = useBlog(id || '');
  const { data: comments, isLoading: commentsLoading } = useComments(id || '');
  const { data: isBookmarked = false } = useCheckBookmarkStatus(id || '');
  const likeMutation = useLikeBlog();
  const bookmarkMutation = useToggleBookmark();
  const createCommentMutation = useCreateComment();
  
  const [liked, setLiked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(0);
  const [comment, setComment] = React.useState('');

  React.useEffect(() => {
    if (blogPost) {
      setLiked(blogPost.is_liked || false);
      setLikeCount(blogPost.likes_count || 0);
    }
  }, [blogPost]);

  if (!id) {
    navigate('/');
    return null;
  }

  const handleLike = async () => {
    if (!user || !blogPost) return;
    
    const newLikedState = !liked;
    setLiked(newLikedState);
    setLikeCount(newLikedState ? likeCount + 1 : likeCount - 1);

    try {
      await likeMutation.mutateAsync({ blogId: blogPost.id, isLiked: liked });
    } catch (error) {
      // Revert on error
      setLiked(liked);
      setLikeCount(likeCount);
    }
  };

  const handleBookmark = async () => {
    if (!user || !blogPost) return;
    
    try {
      await bookmarkMutation.mutateAsync({ 
        blogId: blogPost.id, 
        isBookmarked: isBookmarked 
      });
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  const handleCommentSubmit = async () => {
    if (comment.trim() && blogPost) {
      try {
        await createCommentMutation.mutateAsync({
          content: comment.trim(),
          blogId: blogPost.id,
        });
        setComment('');
      } catch (error) {
        console.error('Error posting comment:', error);
      }
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </div>
    );
  }

  if (error || !blogPost) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Blog post not found</h2>
            <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/')}>Back to Home</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>{blogPost.author?.name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-gray-900">{blogPost.author?.name || 'Anonymous'}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(blogPost.created_at)}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBookmark}
                  disabled={bookmarkMutation.isPending || !user}
                  className={`${isBookmarked ? 'text-blue-600' : 'text-gray-400'} hover:text-blue-600`}
                >
                  {bookmarkMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                  )}
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-gray-500" />
                <span className="font-semibold text-lg text-gray-900">{blogPost.company}</span>
                <Badge className="bg-blue-100 text-blue-700">
                  {blogPost.role}
                </Badge>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                {blogPost.title}
              </h1>
              
              <div className="flex flex-wrap gap-2">
                {blogPost.tags?.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-8">
              {blogPost.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
            
            <div className="flex items-center justify-between pt-8 border-t border-gray-200">
              <div className="flex items-center space-x-6">
                <Button
                  variant="ghost"
                  onClick={handleLike}
                  className={`${liked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
                  disabled={!user}
                >
                  <Heart className={`w-5 h-5 mr-2 ${liked ? 'fill-current' : ''}`} />
                  {likeCount} Likes
                </Button>
                <Button variant="ghost" className="text-gray-500 hover:text-blue-500">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {comments?.length || 0} Comments
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">Comments ({comments?.length || 0})</h3>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Add Comment */}
            {user && (
              <div className="space-y-3">
                <Textarea
                  placeholder="Share your thoughts or ask a question..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                  className="resize-none"
                />
                <Button 
                  onClick={handleCommentSubmit}
                  disabled={createCommentMutation.isPending || !comment.trim()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {createCommentMutation.isPending ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : null}
                  Post Comment
                </Button>
              </div>
            )}
            
            {/* Comments List */}
            <div className="space-y-4">
              {commentsLoading ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                </div>
              ) : comments && comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="border-l-2 border-gray-100 pl-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>{comment.author?.name?.charAt(0) || 'U'}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-sm">{comment.author?.name || 'Anonymous'}</span>
                          <span className="text-xs text-gray-500">{formatDate(comment.created_at)}</span>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed mb-2">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No comments yet. Be the first to comment!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlogPost;
