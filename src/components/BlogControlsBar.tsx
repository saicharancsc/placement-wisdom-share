
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { LayoutGrid, LayoutList } from 'lucide-react';

interface BlogControlsBarProps {
  blogCount: number;
  hasSearchQuery: boolean;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

const BlogControlsBar: React.FC<BlogControlsBarProps> = ({
  blogCount,
  hasSearchQuery,
  viewMode,
  onViewModeChange
}) => {
  return (
    <Card className="mb-4 sm:mb-6">
      <CardContent className="p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="secondary" className="text-xs sm:text-sm">
              {blogCount} Posts
            </Badge>
            {!hasSearchQuery && blogCount > 0 && (
              <Badge variant="outline" className="text-xs sm:text-sm">
                Latest Updates
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onViewModeChange('grid')}
              className="flex items-center gap-1 sm:gap-2 flex-1 sm:flex-initial text-xs sm:text-sm"
            >
              <LayoutGrid className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Grid</span>
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onViewModeChange('list')}
              className="flex items-center gap-1 sm:gap-2 flex-1 sm:flex-initial text-xs sm:text-sm"
            >
              <LayoutList className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">List</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogControlsBar;
