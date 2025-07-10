import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, getInitial } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PlusCircle, Search, BookOpen, User, LogOut, Bookmark, Heart, Home, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Drawer, DrawerTrigger, DrawerContent } from '@/components/ui/drawer';
import { useProfile } from '@/hooks/useProfile';

interface NavigationProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

const Navigation = ({ searchQuery = '', onSearchChange }: NavigationProps) => {
  const { user, signOut } = useAuth();
  const { data: profile } = useProfile();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      // Navigate to home page after successful signout
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error",
        description: "There was an error signing out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">Sharify</span>
          </Link>

          {/* Hamburger menu for mobile */}
          <div className="md:hidden flex items-center">
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="w-6 h-6" />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="flex flex-col gap-4 p-4">
                  {user && onSearchChange && (
                    <div className="relative mb-2">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search by company, role, or skills..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                      />
                    </div>
                  )}
                  {user ? (
                    <>
                      <Link to="/">
                        <Button variant="ghost" className="w-full justify-start">
                          <Home className="w-4 h-4 mr-2" /> Home
                        </Button>
                      </Link>
                      <Link to="/create">
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium justify-start">
                          <PlusCircle className="w-4 h-4 mr-2" /> Share Experience
                        </Button>
                      </Link>
                      <Link to="/dashboard">
                        <Button variant="ghost" className="w-full justify-start">
                          <User className="w-4 h-4 mr-2" /> Dashboard
                        </Button>
                      </Link>
                      <Link to="/liked">
                        <Button variant="ghost" className="w-full justify-start">
                          <Heart className="w-4 h-4 mr-2" /> Liked Posts
                        </Button>
                      </Link>
                      <Link to="/bookmarks">
                        <Button variant="ghost" className="w-full justify-start">
                          <Bookmark className="w-4 h-4 mr-2" /> Bookmarks
                        </Button>
                      </Link>
                      <Button variant="ghost" className="w-full justify-start" onClick={handleSignOut}>
                        <LogOut className="w-4 h-4 mr-2" /> Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to="/">
                        <Button variant="ghost" className="w-full justify-start">
                          <Home className="w-4 h-4 mr-2" /> Home
                        </Button>
                      </Link>
                      <Link to="/login">
                        <Button variant="outline" className="w-full font-medium justify-start">
                          Login
                        </Button>
                      </Link>
                      <Link to="/signup">
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium justify-start">
                          Sign Up
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </DrawerContent>
            </Drawer>
          </div>

          {/* Search Bar - Only show for authenticated users on desktop */}
          {user && onSearchChange && (
            <div className="flex-1 max-w-lg mx-8 hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by company, role, or skills..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Right Section - Only show on desktop */}
          <div className="items-center space-x-4 hidden md:flex">
            {user ? (
              <>
                {/* <Link to="/">
                  <Button variant="ghost" className="flex items-center">
                    <Home className="w-4 h-4 mr-2" />
                    Home
                  </Button>
                </Link> */}
                
                {/* Resources Button */}
                {/* <Link to="/resources">
                  <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium flex items-center mr-2">
                    Resources
                  </Button>
                </Link> */}
                <Link to="/create">
                  <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Share Experience
                  </Button>
                </Link>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="relative h-10 w-10 rounded-full border-2 border-blue-600 bg-white hover:bg-blue-50 p-0 flex items-center justify-center">
                      <Avatar className="h-8 w-8 ring-2 ring-blue-400 ring-offset-2">
                        <AvatarFallback className="bg-blue-600 text-white font-semibold">
                          {getInitial(profile?.name, user?.email)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-background border border-border" align="end" forceMount>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/liked" className="flex items-center">
                        <Heart className="mr-2 h-4 w-4" />
                        Liked Posts
                      </Link>
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem asChild>
                      <Link to="/bookmarks" className="flex items-center">
                        <Bookmark className="mr-2 h-4 w-4" />
                        Bookmarks
                      </Link>
                    </DropdownMenuItem> */}
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/">
                  <Button variant="ghost" className="flex items-center">
                    <Home className="w-4 h-4 mr-2" />
                    Home
                  </Button>
                </Link>
                <div className="flex space-x-3">
                  <Link to="/login">
                    <Button variant="outline" className="font-medium">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium">
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
