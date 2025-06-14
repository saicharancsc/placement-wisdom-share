
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PlusCircle, Search, BookOpen, User, LogOut, Bookmark, Heart, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface NavigationProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

const Navigation = ({ searchQuery = '', onSearchChange }: NavigationProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-lavender-200/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-lavender-400 to-blush-400 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">PlacementWise</span>
          </Link>

          {/* Search Bar - Only show for authenticated users */}
          {user && onSearchChange && (
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lavender-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by company, role, or skills..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-lavender-200 rounded-xl bg-white/80 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-lavender-300 focus:border-transparent shadow-sm transition-all duration-200"
                />
              </div>
            </div>
          )}

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/">
                  <Button variant="ghost" className="flex items-center text-midnight-600 hover:text-lavender-600 hover:bg-lavender-50 rounded-xl transition-all duration-200">
                    <Home className="w-4 h-4 mr-2" />
                    Home
                  </Button>
                </Link>
                
                <Link to="/create">
                  <Button className="bg-gradient-to-r from-lavender-500 to-blush-500 hover:from-lavender-600 hover:to-blush-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Share Experience
                  </Button>
                </Link>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="relative h-10 w-10 rounded-full border-2 border-lavender-300 bg-white/80 backdrop-blur-sm hover:bg-lavender-50 shadow-sm hover:shadow-md transition-all duration-200">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" alt="Profile" />
                        <AvatarFallback className="bg-gradient-to-br from-lavender-400 to-blush-400 text-white font-semibold">
                          {user.email?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white/95 backdrop-blur-md border border-lavender-200 shadow-xl rounded-xl" align="end" forceMount>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="flex items-center text-midnight-600 hover:text-lavender-600 hover:bg-lavender-50 rounded-lg transition-colors">
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/liked" className="flex items-center text-midnight-600 hover:text-lavender-600 hover:bg-lavender-50 rounded-lg transition-colors">
                        <Heart className="mr-2 h-4 w-4" />
                        Liked Posts
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/bookmarks" className="flex items-center text-midnight-600 hover:text-lavender-600 hover:bg-lavender-50 rounded-lg transition-colors">
                        <Bookmark className="mr-2 h-4 w-4" />
                        Bookmarks
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut} className="text-midnight-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/">
                  <Button variant="ghost" className="flex items-center text-midnight-600 hover:text-lavender-600 hover:bg-lavender-50 rounded-xl transition-all duration-200">
                    <Home className="w-4 h-4 mr-2" />
                    Home
                  </Button>
                </Link>
                <div className="flex space-x-3">
                  <Link to="/login">
                    <Button variant="outline" className="font-medium border-lavender-300 text-midnight-600 hover:bg-lavender-50 hover:text-lavender-600 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="bg-gradient-to-r from-lavender-500 to-blush-500 hover:from-lavender-600 hover:to-blush-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
