
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, BookOpen, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const HeroSection = () => {
  const { user } = useAuth();

  const scrollToExperiences = () => {
    const experiencesSection = document.getElementById('experiences');
    if (experiencesSection) {
      experiencesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Main Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Unlock Placement Success with Peer
              <br />
              <span className="text-cyan-200">Experiences</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Learn from seniors who've been through the journey. Get insights on interviews, preparation, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {user ? (
                <Link to="/create">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 text-lg">
                    Share Your Experience
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              ) : (
                <Link to="/signup">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 text-lg">
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              )}
              <Button 
                size="lg" 
                onClick={scrollToExperiences}
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 text-lg"
              >
                Browse Experiences
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">1000+</h3>
              <p className="text-muted-foreground">Students Helped</p>
            </div>
            <div className="space-y-2">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">500+</h3>
              <p className="text-muted-foreground">Experience Shared</p>
            </div>
            <div className="space-y-2">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">200+</h3>
              <p className="text-muted-foreground">Companies Covered</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16" id="experiences">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose PlacementWise?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Get authentic experiences from students who've successfully navigated the placement process.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Real Experiences",
                description: "Read authentic interview experiences from your seniors and peers.",
                icon: "📝"
              },
              {
                title: "Company Insights",
                description: "Get detailed insights about interview processes at top companies.",
                icon: "🏢"
              },
              {
                title: "Preparation Tips", 
                description: "Learn proven strategies and tips that helped others succeed.",
                icon: "💡"
              },
              {
                title: "Technical Rounds",
                description: "Understand what to expect in coding and technical interviews.",
                icon: "💻"
              },
              {
                title: "HR Rounds",
                description: "Get tips for behavioral interviews and HR discussions.",
                icon: "🤝"
              },
              {
                title: "Success Stories",
                description: "Get motivated by reading success stories from your peers.",
                icon: "🎉"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
