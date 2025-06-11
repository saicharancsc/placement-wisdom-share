
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
        <div className="flex-1 max-w-4xl mx-auto px-4 py-12 text-center">
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Sign In Required
            </h2>
            <p className="text-gray-600 mb-6">
              Please sign in to your account to view and share placement experiences.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/login">
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline" className="font-medium">
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
        <div className="flex-1 max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Error loading posts</h2>
            <p className="text-muted-foreground">Please try again later.</p>
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
      
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          {hasSearchQuery ? (
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Search Results for "{searchQuery}"
              </h1>
              <p className="text-muted-foreground">
                {isSearching ? 'Searching...' : `Found ${displayBlogs?.length || 0} result(s)`}
              </p>
            </div>
          ) : (
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-foreground mb-4">Latest Placement Experiences</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover interview experiences, tips, and insights from your peers to ace your placement season.
              </p>
            </div>
          )}

          {/* Controls Bar */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-sm">
                    {displayBlogs?.length || 0} Posts
                  </Badge>
                  {!hasSearchQuery && displayBlogs && displayBlogs.length > 0 && (
                    <Badge variant="outline" className="text-sm">
                      Latest Updates
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="flex items-center gap-2"
                  >
                    <LayoutGrid className="w-4 h-4" />
                    Grid
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="flex items-center gap-2"
                  >
                    <LayoutList className="w-4 h-4" />
                    List
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
            <span className="ml-2 text-muted-foreground">Searching...</span>
          </div>
        ) : (
          <div className="space-y-6">
            {displayBlogs && displayBlogs.length > 0 ? (
              <div className={`
                ${viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
                  : 'space-y-4'
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
              <Card className="text-center py-12">
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                    <BookOpen className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      {hasSearchQuery ? 'No posts found' : 'No posts yet'}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {hasSearchQuery 
                        ? 'Try searching with different keywords.' 
                        : 'Be the first to share your placement experience!'
                      }
                    </p>
                    {!hasSearchQuery && (
                      <Link to="/create">
                        <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white">
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
          <div className="text-center mt-12 py-8">
            <p className="text-muted-foreground text-sm">
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
