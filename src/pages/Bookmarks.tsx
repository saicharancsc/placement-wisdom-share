
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
      <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Please log in to view your bookmarks</h1>
            <Link to="/login">
              <Button>Sign In</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
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
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <Link to="/" className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors w-fit">
            <Home className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground text-center sm:text-left">My Bookmarks</h1>
          <div className="hidden sm:block"></div>
        </div>

        {bookmarks && bookmarks.length > 0 ? (
          <div className="space-y-4 sm:space-y-6">
            {bookmarks.map((bookmark) => (
              <Card key={bookmark.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3 p-4 sm:p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Link to={`/profile/${bookmark.author_id}`}>
                        <Avatar className="w-8 h-8 sm:w-10 sm:h-10 hover:ring-2 hover:ring-primary/20 transition-all cursor-pointer">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback className="text-xs sm:text-sm">
                            {bookmark.author?.name?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                      </Link>
                      <div className="min-w-0 flex-1">
                        <Link to={`/profile/${bookmark.author_id}`}>
                          <p className="font-medium text-foreground hover:text-primary transition-colors cursor-pointer text-sm sm:text-base truncate">
                            {bookmark.author?.name || 'Anonymous'}
                          </p>
                        </Link>
                        <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(bookmark.created_at)}</span>
                        </div>
                      </div>
                    </div>
                    <BookmarkIcon className="w-4 h-4 text-primary fill-current flex-shrink-0" />
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0 p-4 sm:p-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 flex-wrap gap-2">
                      <div className="flex items-center space-x-2 min-w-0">
                        <Building2 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <span className="font-semibold text-foreground text-sm sm:text-base truncate">
                          {bookmark.company}
                        </span>
                      </div>
                      <Badge variant="secondary" className="bg-primary/10 text-primary text-xs sm:text-sm flex-shrink-0">
                        {bookmark.role}
                      </Badge>
                    </div>
                    
                    <Link to={`/blog/${bookmark.id}`}>
                      <h3 className="text-base sm:text-lg font-semibold text-foreground hover:text-primary transition-colors line-clamp-2 leading-tight">
                        {bookmark.title}
                      </h3>
                    </Link>
                    
                    <p className="text-muted-foreground line-clamp-3 leading-relaxed text-sm sm:text-base">
                      {bookmark.content.substring(0, 200)}...
                    </p>
                    
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {bookmark.tags?.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 gap-3">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-muted-foreground text-sm">
                          <Heart className="w-4 h-4 mr-1" />
                          {bookmark.likes_count || 0}
                        </div>
                        <div className="flex items-center text-muted-foreground text-sm">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {bookmark.comments_count || 0}
                        </div>
                      </div>
                      
                      <Link to={`/blog/${bookmark.id}`} className="w-full sm:w-auto">
                        <Button variant="outline" size="sm" className="w-full sm:w-auto">
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
            <BookmarkIcon className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-base sm:text-lg font-medium text-foreground mb-2">
              No bookmarks yet
            </h3>
            <p className="text-muted-foreground mb-4 text-sm sm:text-base px-4">
              Start bookmarking posts you want to read later!
            </p>
            <Link to="/">
              <Button className="w-full sm:w-auto">
                Explore Posts
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
