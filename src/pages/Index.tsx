
import React from 'react';
import Navigation from '../components/Navigation';
import BlogCard from '../components/BlogCard';
import HeroSection from '../components/HeroSection';
import { useBlogs } from '@/hooks/useBlogs';
import { useSearch } from '@/hooks/useSearch';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const { data: blogs, isLoading: blogsLoading, error: blogsError } = useBlogs();
  const { searchQuery, setSearchQuery, searchResults, isSearching, hasSearchQuery } = useSearch();

  // Use search results if there's a search query, otherwise use all blogs
  const displayBlogs = hasSearchQuery ? searchResults : blogs;
  const isLoading = hasSearchQuery ? isSearching : blogsLoading;
  const error = blogsError;

  if (isLoading && !hasSearchQuery) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Error loading posts</h2>
            <p className="text-muted-foreground">Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      {/* Show hero section only when not searching */}
      {!hasSearchQuery && <HeroSection />}
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          {hasSearchQuery ? (
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Search Results for "{searchQuery}"
              </h1>
              <p className="text-muted-foreground">
                {isSearching ? 'Searching...' : `Found ${displayBlogs?.length || 0} result(s)`}
              </p>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">Latest Placement Experiences</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover interview experiences, tips, and insights from your peers to ace your placement season.
              </p>
            </div>
          )}
        </div>

        {isSearching && hasSearchQuery ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Searching...</span>
          </div>
        ) : (
          <div className="space-y-6">
            {displayBlogs && displayBlogs.length > 0 ? (
              displayBlogs.map((blog) => (
                <BlogCard 
                  key={blog.id} 
                  {...blog}
                  likes={blog.likes_count || 0}
                  comments={blog.comments_count || 0}
                  createdAt={blog.created_at}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-foreground mb-2">
                  {hasSearchQuery ? 'No posts found' : 'No posts yet'}
                </h3>
                <p className="text-muted-foreground">
                  {hasSearchQuery 
                    ? 'Try searching with different keywords.' 
                    : 'Be the first to share your placement experience!'
                  }
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
