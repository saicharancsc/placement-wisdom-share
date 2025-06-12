
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, Calendar, Building2, Home, Bookmark as BookmarkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

const Bookmarks = () => {
  const { user } = useAuth();
  const { data: bookmarks, isLoading } = useBookmarks();

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your bookmarks</h1>
          <Link to="/login">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </div>
    );
  }

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

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-6">
        <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
          <Home className="w-5 h-5" />
          <span className="font-medium">Back to Home</span>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">My Bookmarks</h1>
        <div></div>
      </div>

      {bookmarks && bookmarks.length > 0 ? (
        <div className="space-y-6">
          {bookmarks.map((bookmark) => (
            <Card key={bookmark.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>{bookmark.blog.author?.name?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">{bookmark.blog.author?.name || 'Anonymous'}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(bookmark.blog.created_at)}</span>
                      </div>
                    </div>
                  </div>
                  <BookmarkIcon className="w-4 h-4 text-blue-600 fill-current" />
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Building2 className="w-4 h-4 text-gray-500" />
                    <span className="font-semibold text-gray-900">{bookmark.blog.company}</span>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      {bookmark.blog.role}
                    </Badge>
                  </div>
                  
                  <Link to={`/blog/${bookmark.blog.id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
                      {bookmark.blog.title}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-600 line-clamp-3 leading-relaxed">
                    {bookmark.blog.content.substring(0, 200)}...
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {bookmark.blog.tags?.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-gray-500">
                        <Heart className="w-4 h-4 mr-1" />
                        {bookmark.blog.likes_count || 0}
                      </div>
                      <div className="flex items-center text-gray-500">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {bookmark.blog.comments_count || 0}
                      </div>
                    </div>
                    
                    <Link to={`/blog/${bookmark.blog.id}`}>
                      <Button variant="outline" size="sm">
                        Read More
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <BookmarkIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No bookmarks yet
          </h3>
          <p className="text-gray-600 mb-4">
            Start bookmarking posts you want to read later!
          </p>
          <Link to="/">
            <Button>
              Explore Posts
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
