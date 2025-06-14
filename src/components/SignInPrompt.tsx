
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const SignInPrompt = () => {
  return (
    <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-center">
      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 border border-gray-200">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
          Sign In Required
        </h2>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          Please sign in to your account to view and share placement experiences.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link to="/login" className="w-full sm:w-auto">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium">
              Sign In
            </Button>
          </Link>
          <Link to="/signup" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full font-medium">
              Create Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPrompt;
