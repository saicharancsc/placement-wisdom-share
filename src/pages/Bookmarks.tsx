
import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import BlogCard from '../components/BlogCard';
import { Bookmark, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useBookmarks } from '@/hooks/useBookmarks';

const Bookmarks = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: bookmarkedPosts, isLoading, error } = useBookmarks();

  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-foreground mb-2">Error loading bookmarks</h3>
            <p className="text-muted-foreground">
              Please try again later.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Bookmark className="w-8 h-8 text-blue-500 fill-current" />
            <h1 className="text-3xl font-bold text-foreground">Bookmarks</h1>
          </div>
          <p className="text-muted-foreground">
            Your saved posts for quick reference and future reading.
          </p>
        </div>

        <div className="space-y-6">
          {bookmarkedPosts && bookmarkedPosts.length > 0 ? (
            bookmarkedPosts.map((post) => (
              <BlogCard key={post.id} {...post} />
            ))
          ) : (
            <div className="text-center py-12">
              <Bookmark className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No bookmarks yet</h3>
              <p className="text-muted-foreground">
                Start bookmarking posts to save them for later!
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Bookmarks;
