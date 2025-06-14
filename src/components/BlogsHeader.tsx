
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
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-3">
          Search Results for "{searchQuery}"
        </h1>
        <p className="text-midnight-600 text-base sm:text-lg">
          {isSearching ? 'Searching...' : `Found ${blogCount || 0} result(s)`}
        </p>
      </div>
    );
  }

  return (
    <div className="text-center mb-6 sm:mb-8">
      <h2 className="text-3xl sm:text-4xl font-bold gradient-text mb-4 sm:mb-6">Latest Placement Experiences</h2>
      <p className="text-midnight-600 max-w-2xl mx-auto text-base sm:text-lg px-4">
        Discover interview experiences, tips, and insights from your peers to ace your placement season.
      </p>
    </div>
  );
};

export default BlogsHeader;
