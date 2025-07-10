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
import { useState } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const { user, loading: authLoading } = useAuth();
  const { data: blogs, isLoading: blogsLoading, error: blogsError } = useBlogs();
  const { searchQuery, setSearchQuery, searchResults, isSearching, hasSearchQuery } = useSearch();
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [tagFilters, setTagFilters] = useState<string[]>([]);

  // Use search results if there's a search query, otherwise use all blogs
  const displayBlogs = hasSearchQuery ? searchResults : blogs;
  const isLoading = hasSearchQuery ? isSearching : blogsLoading;
  const error = blogsError;

  // Get all unique tags from displayBlogs
  const allTags = Array.from(new Set((displayBlogs || []).flatMap(blog => blog.tags || [])));
  const filteredBlogs = tagFilters.length > 0
    ? (displayBlogs || []).filter(blog => blog.tags && blog.tags.some(tag => tagFilters.includes(tag)))
    : displayBlogs;

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <LoadingSpinner />
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
        <SignInPrompt />
        <Footer />
      </div>
    );
  }

  if (isLoading && !hasSearchQuery) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <LoadingSpinner />
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <ErrorState />
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
        <div id="latest-experiences" className="mb-6 sm:mb-8">
          <BlogsHeader
            hasSearchQuery={hasSearchQuery}
            searchQuery={searchQuery}
            isSearching={isSearching}
            blogCount={displayBlogs?.length || 0}
          />

          {/* Controls Bar */}
          <BlogControlsBar
            blogCount={filteredBlogs?.length || 0}
            hasSearchQuery={hasSearchQuery}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
          {/* Tag Filter Dropdown (multi-select) */}
          {allTags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2 items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    {tagFilters.length > 0 ? `Tags: ${tagFilters.join(', ')}` : 'Filter by Tag'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="min-w-[220px] p-2">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tagFilters.map(tag => (
                      <Badge key={tag} className="bg-blue-600 text-white cursor-pointer" onClick={() => setTagFilters(tagFilters.filter(t => t !== tag))}>
                        {tag} ✕
                      </Badge>
                    ))}
                  </div>
                  {allTags.map(tag => (
                    <DropdownMenuItem
                      key={tag}
                      onSelect={() => {
                        if (tagFilters.includes(tag)) {
                          setTagFilters(tagFilters.filter(t => t !== tag));
                        } else {
                          setTagFilters([...tagFilters, tag]);
                        }
                      }}
                      className={tagFilters.includes(tag) ? 'bg-blue-600 text-white' : ''}
                    >
                      {tagFilters.includes(tag) ? '✓ ' : ''}{tag}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              {tagFilters.length > 0 && (
                <Button variant="ghost" size="sm" onClick={() => setTagFilters([])}>
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Content Section */}
        {isSearching && hasSearchQuery ? (
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner text="Searching..." />
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {filteredBlogs && filteredBlogs.length > 0 ? (
              <div className={`
                ${viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6' 
                  : 'space-y-3 sm:space-y-4'
                }
              `}>
                {filteredBlogs.map((blog) => (
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
              <EmptyBlogsState hasSearchQuery={hasSearchQuery} />
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
