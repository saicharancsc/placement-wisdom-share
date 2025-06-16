
import React from 'react';

interface BlogsHeaderProps {
  hasSearchQuery: boolean;
  searchQuery: string;
  isSearching: boolean;
  blogCount: number;
}

const BlogsHeader: React.FC<BlogsHeaderProps> = ({
  hasSearchQuery,
  searchQuery,
  isSearching,
  blogCount
}) => {
  if (hasSearchQuery) {
    return (
      <div className="text-center mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Search Results for "{searchQuery}"
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          {isSearching ? 'Searching...' : `Found ${blogCount || 0} result(s)`}
        </p>
      </div>
    );
  }

  return (
    <div className="text-center mb-4 sm:mb-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">Latest Placement Experiences</h2>
      <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base px-4">
        Discover interview experiences, tips, and insights from your peers to ace your placement season.
      </p>
    </div>
  );
};

export default BlogsHeader;
