
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
      <div className="bg-gradient-to-br from-lavender-400 via-blush-400 to-teal-400 text-white relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-500/20 to-cyan-500/20"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Unlock Placement Success with Peer
              <br />
              <span className="text-white/90 drop-shadow-sm">Experiences</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-sm">
              Learn from seniors who've been through the journey. Get insights on interviews, preparation, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {user ? (
                <Link to="/create">
                  <Button size="lg" variant="outline" className="bg-white/20 backdrop-blur-sm border-2 border-white/40 text-white hover:bg-white hover:text-lavender-600 font-semibold px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    Share Your Experience
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              ) : (
                <Link to="/signup">
                  <Button size="lg" variant="outline" className="bg-white/20 backdrop-blur-sm border-2 border-white/40 text-white hover:bg-white hover:text-lavender-600 font-semibold px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              )}
              <Button 
                size="lg" 
                onClick={scrollToExperiences}
                variant="outline"
                className="bg-white/20 backdrop-blur-sm border-2 border-white/40 text-white hover:bg-white hover:text-lavender-600 font-semibold px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Browse Experiences
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-lavender-200/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4 group">
              <div className="w-16 h-16 bg-gradient-to-br from-lavender-200 to-lavender-300 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Users className="w-8 h-8 text-lavender-600" />
              </div>
              <h3 className="text-3xl font-bold gradient-text">1000+</h3>
              <p className="text-midnight-600">Students Helped</p>
            </div>
            <div className="space-y-4 group">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-200 to-teal-300 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <BookOpen className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-3xl font-bold gradient-text">500+</h3>
              <p className="text-midnight-600">Experience Shared</p>
            </div>
            <div className="space-y-4 group">
              <div className="w-16 h-16 bg-gradient-to-br from-blush-200 to-blush-300 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Trophy className="w-8 h-8 text-blush-600" />
              </div>
              <h3 className="text-3xl font-bold gradient-text">200+</h3>
              <p className="text-midnight-600">Companies Covered</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-br from-lavender-50/80 to-teal-50/80 py-20" id="experiences">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-6">
              Why Choose PlacementWise?
            </h2>
            <p className="text-midnight-600 text-lg max-w-2xl mx-auto">
              Get authentic experiences from students who've successfully navigated the placement process.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Real Experiences",
                description: "Read authentic interview experiences from your seniors and peers.",
                icon: "📝",
                gradient: "from-lavender-100 to-lavender-200"
              },
              {
                title: "Company Insights",
                description: "Get detailed insights about interview processes at top companies.",
                icon: "🏢",
                gradient: "from-blush-100 to-blush-200"
              },
              {
                title: "Preparation Tips", 
                description: "Learn proven strategies and tips that helped others succeed.",
                icon: "💡",
                gradient: "from-teal-100 to-teal-200"
              },
              {
                title: "Technical Rounds",
                description: "Understand what to expect in coding and technical interviews.",
                icon: "💻",
                gradient: "from-lavender-100 to-blush-100"
              },
              {
                title: "HR Rounds",
                description: "Get tips for behavioral interviews and HR discussions.",
                icon: "🤝",
                gradient: "from-blush-100 to-teal-100"
              },
              {
                title: "Success Stories",
                description: "Get motivated by reading success stories from your peers.",
                icon: "🎉",
                gradient: "from-teal-100 to-lavender-100"
              }
            ].map((feature, index) => (
              <div key={index} className={`bg-gradient-to-br ${feature.gradient} backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/30 group hover:-translate-y-1`}>
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-midnight-700 mb-3">{feature.title}</h3>
                <p className="text-midnight-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
