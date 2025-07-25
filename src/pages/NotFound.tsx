import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <div className="flex-1 flex items-center justify-center py-10 sm:py-16">
        <div className="text-center max-w-xs sm:max-w-md mx-auto px-3 sm:px-4">
          <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-3 sm:mb-4">404</h1>
          <h2 className="text-lg sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
          <Link to="/">
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium w-full sm:w-auto">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;
