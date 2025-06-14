
import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import BlogCard from '../components/BlogCard';
import HeroSection from '../components/HeroSection';
import { useBlogs } from '@/hooks/useBlogs';
import { useSearch } from '@/hooks/useSearch';
import { useAuth } from '@/hooks/useAuth';
import { Loader2, Filter, SortAsc, LayoutGrid, LayoutList, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const { user, loading: authLoading } = useAuth();
  const { data: blogs, isLoading: blogsLoading, error: blogsError } = useBlogs();
  const { searchQuery, setSearchQuery, searchResults, isSearching, hasSearchQuery } = useSearch();
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');

  // Use search results if there's a search query, otherwise use all blogs
  const displayBlogs = hasSearchQuery ? searchResults : blogs;
  const isLoading = hasSearchQuery ? isSearching : blogsLoading;
  const error = blogsError;

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <div className="flex-1 flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  // Show sign-in prompt if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <HeroSection />
        <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-center">
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 border border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Sign In Required
            </h2>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">
              Please sign in to your account to view and share placement experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link to="/login" className="w-full sm:w-auto">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full font-medium">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (isLoading && !hasSearchQuery) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <div className="flex-1 flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Error loading posts</h2>
            <p className="text-muted-foreground text-sm sm:text-base">Please try again later.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      {/* Show hero section only when not searching */}
      {!hasSearchQuery && <HeroSection />}
      
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          {hasSearchQuery ? (
            <div className="text-center mb-4 sm:mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Search Results for "{searchQuery}"
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                {isSearching ? 'Searching...' : `Found ${displayBlogs?.length || 0} result(s)`}
              </p>
            </div>
          ) : (
            <div className="text-center mb-4 sm:mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">Latest Placement Experiences</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base px-4">
                Discover interview experiences, tips, and insights from your peers to ace your placement season.
              </p>
            </div>
          )}

          {/* Controls Bar */}
          <Card className="mb-4 sm:mb-6">
            <CardContent className="p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary" className="text-xs sm:text-sm">
                    {displayBlogs?.length || 0} Posts
                  </Badge>
                  {!hasSearchQuery && displayBlogs && displayBlogs.length > 0 && (
                    <Badge variant="outline" className="text-xs sm:text-sm">
                      Latest Updates
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="flex items-center gap-1 sm:gap-2 flex-1 sm:flex-initial text-xs sm:text-sm"
                  >
                    <LayoutGrid className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">Grid</span>
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="flex items-center gap-1 sm:gap-2 flex-1 sm:flex-initial text-xs sm:text-sm"
                  >
                    <LayoutList className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">List</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Section */}
        {isSearching && hasSearchQuery ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground text-sm sm:text-base">Searching...</span>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {displayBlogs && displayBlogs.length > 0 ? (
              <div className={`
                ${viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6' 
                  : 'space-y-3 sm:space-y-4'
                }
              `}>
                {displayBlogs.map((blog) => (
                  <div key={blog.id} className="animate-fade-in">
                    <BlogCard 
                      {...blog}
                      likes={blog.likes_count || 0}
                      comments={blog.comments_count || 0}
                      createdAt={blog.created_at}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <Card className="text-center py-8 sm:py-12">
                <CardContent className="space-y-4 px-4 sm:px-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                    <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-foreground mb-2">
                      {hasSearchQuery ? 'No posts found' : 'No posts yet'}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm sm:text-base px-2">
                      {hasSearchQuery 
                        ? 'Try searching with different keywords.' 
                        : 'Be the first to share your placement experience!'
                      }
                    </p>
                    {!hasSearchQuery && (
                      <Link to="/create" className="w-full sm:w-auto inline-block">
                        <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white">
                          Share Your Experience
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Load More Section (for future pagination) */}
        {displayBlogs && displayBlogs.length > 0 && !hasSearchQuery && (
          <div className="text-center mt-8 sm:mt-12 py-6 sm:py-8">
            <p className="text-muted-foreground text-xs sm:text-sm">
              Showing all {displayBlogs.length} posts
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Index;
