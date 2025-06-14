
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

interface EmptyBlogsStateProps {
  hasSearchQuery: boolean;
}

const EmptyBlogsState: React.FC<EmptyBlogsStateProps> = ({ hasSearchQuery }) => {
  return (
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
  );
};

export default EmptyBlogsState;
