
import React from 'react';

interface ErrorStateProps {
  title?: string;
  message?: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ 
  title = "Error loading posts", 
  message = "Please try again later." 
}) => {
  return (
    <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">{title}</h2>
        <p className="text-muted-foreground text-sm sm:text-base">{message}</p>
      </div>
    </div>
  );
};

export default ErrorState;
