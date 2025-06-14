
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, BookOpen, Trophy, Sparkles } from 'lucide-react';
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
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-700 to-cyan-600">
        <div className="absolute inset-0 bg-black/10"></div>
        {/* Floating Shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/5 rounded-full animate-float-slow"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-bounce-gentle"></div>
        <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-white/5 rounded-full animate-float"></div>
      </div>

      {/* Main Hero Section */}
      <div className="relative text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <div className="animate-slide-in-up">
              <div className="flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-yellow-300 animate-bounce-gentle mr-3" />
                <span className="text-lg font-medium bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  Your Success Journey Starts Here
                </span>
                <Sparkles className="w-8 h-8 text-yellow-300 animate-bounce-gentle ml-3" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
              Unlock Placement Success with
              <br />
              <span className="bg-gradient-to-r from-cyan-200 via-yellow-200 to-pink-200 bg-clip-text text-transparent animate-float">
                Peer Experiences
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
              Learn from seniors who've been through the journey. Get insights on interviews, preparation, and more.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-in-up" style={{ animationDelay: '0.6s' }}>
              {user ? (
                <Link to="/create">
                  <Button size="lg" className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group">
                    Share Your Experience
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              ) : (
                <Link to="/signup">
                  <Button size="lg" className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group">
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              )}
              <Button 
                size="lg" 
                onClick={scrollToExperiences}
                className="bg-transparent border-2 border-white/50 text-white hover:bg-white/10 backdrop-blur-sm font-semibold px-8 py-4 text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Browse Experiences
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200/50 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2 animate-slide-in-up group" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300 animate-float">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">1000+</h3>
              <p className="text-muted-foreground font-medium">Students Helped</p>
            </div>
            <div className="space-y-2 animate-slide-in-up group" style={{ animationDelay: '0.4s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300 animate-float" style={{ animationDelay: '1s' }}>
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">500+</h3>
              <p className="text-muted-foreground font-medium">Experience Shared</p>
            </div>
            <div className="space-y-2 animate-slide-in-up group" style={{ animationDelay: '0.6s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300 animate-float" style={{ animationDelay: '2s' }}>
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">200+</h3>
              <p className="text-muted-foreground font-medium">Companies Covered</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50/50 py-16" id="experiences">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-slide-in-up">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
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
                icon: "📝",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                title: "Company Insights",
                description: "Get detailed insights about interview processes at top companies.",
                icon: "🏢",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                title: "Preparation Tips", 
                description: "Learn proven strategies and tips that helped others succeed.",
                icon: "💡",
                gradient: "from-yellow-500 to-orange-500"
              },
              {
                title: "Technical Rounds",
                description: "Understand what to expect in coding and technical interviews.",
                icon: "💻",
                gradient: "from-green-500 to-emerald-500"
              },
              {
                title: "HR Rounds",
                description: "Get tips for behavioral interviews and HR discussions.",
                icon: "🤝",
                gradient: "from-indigo-500 to-purple-500"
              },
              {
                title: "Success Stories",
                description: "Get motivated by reading success stories from your peers.",
                icon: "🎉",
                gradient: "from-pink-500 to-rose-500"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group animate-slide-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform duration-300 animate-float`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-blue-600 transition-colors duration-300">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
