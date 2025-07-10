
import React from 'react';
import { BookOpen, Heart, Github, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-foreground">Sharify</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Empowering students with peer experiences and insights for successful placements.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-foreground transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-foreground transition-colors">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/terms" className="hover:text-foreground transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              {/* <li>
                <a
                  href="#latest-experiences"
                  className="hover:text-foreground transition-colors"
                  onClick={e => {
                    e.preventDefault();
                    if (window.location.pathname === "/") {
                      const el = document.getElementById("latest-experiences");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    } else {
                      window.location.href = "/#latest-experiences";
                    }
                  }}
                >
                  Success Stories
                </a>
              </li> */}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/placement_wise" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © 2025 Sharify. All rights reserved.
            </p>
            {/* <div className="flex items-center mt-4 sm:mt-0">
              <span className="text-muted-foreground text-sm mr-2">Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span className="text-muted-foreground text-sm ml-2">for students</span>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
