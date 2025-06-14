
import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const DashboardHeader = () => {
  return (
    <div className="flex items-center justify-between mb-6">
      <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
        <Home className="w-5 h-5" />
        <span className="font-medium">Back to Home</span>
      </Link>
      <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
      <div></div> {/* Spacer for center alignment */}
    </div>
  );
};

export default DashboardHeader;
