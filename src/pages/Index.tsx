
import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import BlogCard from '../components/BlogCard';
import HeroSection from '../components/HeroSection';
import SignInPrompt from '../components/SignInPrompt';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorState from '../components/ErrorState';
import BlogControlsBar from '../components/BlogControlsBar';
import EmptyBlogsState from '../components/EmptyBlogsState';
import BlogsHeader from '../components/BlogsHeader';
import { useBlogs } from '@/hooks/useBlogs';
import { useSearch } from '@/hooks/useSearch';
import { useAuth } from '@/hooks/useAuth';

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
        <Navigation searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <LoadingSpinner />
        <Footer />
      </div>
    );
  }

  // Show sign-in prompt if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
        <Navigation />
        <HeroSection />
        <SignInPrompt />
        <Footer />
      </div>
    );
  }

  if (isLoading && !hasSearchQuery) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
        <Navigation searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <LoadingSpinner />
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
        <Navigation searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <ErrorState />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      <Navigation searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      {/* Show hero section only when not searching */}
      {!hasSearchQuery && <HeroSection />}
      
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8 animate-fade-in">
          <BlogsHeader
            hasSearchQuery={hasSearchQuery}
            searchQuery={searchQuery}
            isSearching={isSearching}
            blogCount={displayBlogs?.length || 0}
          />

          {/* Controls Bar */}
          <div>
            <BlogControlsBar
              blogCount={displayBlogs?.length || 0}
              hasSearchQuery={hasSearchQuery}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          </div>
        </div>

        {/* Content Section */}
        {isSearching && hasSearchQuery ? (
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner text="Searching..." />
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {displayBlogs && displayBlogs.length > 0 ? (
              <div className={`
                ${viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8' 
                  : 'space-y-4 sm:space-y-6'
                }
              `}>
                {displayBlogs.map((blog) => (
                  <div key={blog.id}>
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
              <div className="animate-fade-in">
                <EmptyBlogsState hasSearchQuery={hasSearchQuery} />
              </div>
            )}
          </div>
        )}

        {/* Load More Section (for future pagination) */}
        {displayBlogs && displayBlogs.length > 0 && !hasSearchQuery && (
          <div className="text-center mt-8 sm:mt-12 py-6 sm:py-8">
            <p className="text-muted-foreground text-xs sm:text-sm bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full inline-block">
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
