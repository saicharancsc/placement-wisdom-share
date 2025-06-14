
import React from 'react';
import { Search, Sparkles } from 'lucide-react';

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
      <div className="text-center mb-4 sm:mb-6 animate-fade-in">
        <div className="flex items-center justify-center mb-4">
          <Search className="w-6 h-6 text-blue-500 mr-2" />
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
            Search Results for "{searchQuery}"
          </h1>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl px-4 py-2 inline-block shadow-lg">
          <p className="text-muted-foreground text-sm sm:text-base font-medium">
            {isSearching ? (
              <span className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
                Searching...
              </span>
            ) : (
              `Found ${blogCount || 0} result(s)`
            )}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center mb-4 sm:mb-6">
      <div className="animate-fade-in">
        <div className="flex items-center justify-center mb-4">
          <Sparkles className="w-6 h-6 text-yellow-500 mr-3" />
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
            Latest Placement Experiences
          </h2>
          <Sparkles className="w-6 h-6 text-yellow-500 ml-3" />
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl px-6 py-3 inline-block shadow-lg">
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base font-medium">
            Discover interview experiences, tips, and insights from your peers to ace your placement season.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogsHeader;
