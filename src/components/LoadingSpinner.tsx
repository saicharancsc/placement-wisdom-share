
import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ text }) => {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[400px]">
      <div className="flex items-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        {text && <span className="ml-2 text-muted-foreground text-sm sm:text-base">{text}</span>}
      </div>
    </div>
  );
};

export default LoadingSpinner;
