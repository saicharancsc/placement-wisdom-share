
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
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg animate-slide-in-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PlacementWise
            </span>
          </Link>

          {/* Search Bar - Only show for authenticated users */}
          {user && onSearchChange && (
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-blue-500 transition-colors duration-300" />
                <input
                  type="text"
                  placeholder="Search by company, role, or skills..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-input rounded-xl bg-background/50 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-background transition-all duration-300 shadow-sm hover:shadow-md"
                />
              </div>
            </div>
          )}

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/">
                  <Button variant="ghost" className="flex items-center hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 rounded-xl">
                    <Home className="w-4 h-4 mr-2" />
                    Home
                  </Button>
                </Link>
                
                <Link to="/create">
                  <Button className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Share Experience
                  </Button>
                </Link>
                
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="relative h-10 w-10 rounded-full border-2 border-gradient-to-r from-blue-600 to-purple-600 bg-white hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg" alt="Profile" />
                          <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white font-semibold">
                            {user.email?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-background/95 backdrop-blur-xl border border-border/50 shadow-2xl rounded-xl" align="end" forceMount>
                      <DropdownMenuItem asChild className="rounded-lg hover:bg-blue-50 transition-colors duration-200">
                        <Link to="/dashboard" className="flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="rounded-lg hover:bg-pink-50 transition-colors duration-200">
                        <Link to="/liked" className="flex items-center">
                          <Heart className="mr-2 h-4 w-4" />
                          Liked Posts
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="rounded-lg hover:bg-purple-50 transition-colors duration-200">
                        <Link to="/bookmarks" className="flex items-center">
                          <Bookmark className="mr-2 h-4 w-4" />
                          Bookmarks
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleSignOut} className="rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors duration-200">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            ) : (
              <>
                <Link to="/">
                  <Button variant="ghost" className="flex items-center hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 rounded-xl">
                    <Home className="w-4 h-4 mr-2" />
                    Home
                  </Button>
                </Link>
                <div className="flex space-x-3">
                  <Link to="/login">
                    <Button variant="outline" className="font-medium hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 rounded-xl">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl">
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
