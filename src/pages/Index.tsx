
import React from 'react';
import Navigation from '../components/Navigation';
import BlogCard from '../components/BlogCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Clock, Star, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const [sortBy, setSortBy] = React.useState('recent');
  
  // Mock blog data
  const blogPosts = [
    {
      id: "1",
      title: "My Google SDE Intern Interview Experience - From Application to Offer",
      company: "Google",
      role: "SDE Intern",
      author: "Priya Sharma",
      authorAvatar: "/placeholder.svg",
      excerpt: "I'm sharing my complete Google internship interview journey including the online assessment, technical rounds, and system design discussion. This guide covers preparation tips, common questions, and timeline from application to offer.",
      tags: ["Google", "SDE Intern", "Interview Experience", "Coding", "System Design"],
      likes: 47,
      comments: 12,
      createdAt: "3 days ago",
      isLiked: false,
      isBookmarked: true
    },
    {
      id: "2",
      title: "Amazon SDE Interview Experience - All Rounds Covered",
      company: "Amazon",
      role: "SDE",
      author: "Rahul Kumar",
      authorAvatar: "/placeholder.svg",
      excerpt: "Complete breakdown of Amazon's SDE interview process including 4 rounds of technical interviews, behavioral questions based on leadership principles, and detailed preparation strategy that helped me crack the interview.",
      tags: ["Amazon", "SDE", "Leadership Principles", "Behavioral", "Coding"],
      likes: 65,
      comments: 18,
      createdAt: "5 days ago",
      isLiked: true,
      isBookmarked: false
    },
    {
      id: "3",
      title: "Microsoft Data Science Internship - Complete Journey",
      company: "Microsoft",
      role: "Data Science Intern",
      author: "Sneha Patel",
      authorAvatar: "/placeholder.svg",
      excerpt: "From application to acceptance - my Microsoft Data Science internship experience. Includes technical case studies, SQL queries, machine learning concepts, and tips for standing out in data science interviews.",
      tags: ["Microsoft", "Data Science", "ML", "SQL", "Case Study"],
      likes: 32,
      comments: 9,
      createdAt: "1 week ago",
      isLiked: false,
      isBookmarked: false
    },
    {
      id: "4",
      title: "Goldman Sachs Analyst Interview Tips and Experience",
      company: "Goldman Sachs",
      role: "Analyst",
      author: "Arjun Singh",
      authorAvatar: "/placeholder.svg",
      excerpt: "Investment banking interview experience at Goldman Sachs covering technical finance questions, market scenarios, behavioral interviews, and networking tips that made the difference in my selection.",
      tags: ["Goldman Sachs", "Investment Banking", "Finance", "Behavioral", "Networking"],
      likes: 28,
      comments: 7,
      createdAt: "1 week ago",
      isLiked: false,
      isBookmarked: true
    },
    {
      id: "5",
      title: "Complete Guide to System Design Interviews",
      company: "Meta",
      role: "SDE",
      author: "Vikram Reddy",
      authorAvatar: "/placeholder.svg",
      excerpt: "Master system design interviews with this comprehensive guide covering scalability, database design, load balancing, and real examples from FAANG interviews. Perfect for senior SDE positions.",
      tags: ["Meta", "System Design", "Scalability", "Architecture", "Senior SDE"],
      likes: 156,
      comments: 34,
      createdAt: "2 weeks ago",
      isLiked: true,
      isBookmarked: true
    },
    {
      id: "6",
      title: "McKinsey Case Interview Preparation Guide",
      company: "McKinsey",
      role: "Business Analyst",
      author: "Ananya Gupta",
      authorAvatar: "/placeholder.svg",
      excerpt: "Step-by-step guide to cracking McKinsey case interviews including framework approaches, market sizing, profitability analysis, and practice cases that helped me secure the analyst position.",
      tags: ["McKinsey", "Case Interview", "Consulting", "Business Analysis", "Framework"],
      likes: 89,
      comments: 15,
      createdAt: "2 weeks ago",
      isLiked: false,
      isBookmarked: false
    }
  ];

  // Calculate live data from blogPosts
  const popularTags = React.useMemo(() => {
    const tagCounts: { [key: string]: number } = {};
    blogPosts.forEach(post => {
      post.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    return Object.entries(tagCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 13)
      .map(([tag]) => tag);
  }, [blogPosts]);

  const featuredCompanies = React.useMemo(() => {
    const companyCounts: { [key: string]: number } = {};
    const companyColors: { [key: string]: string } = {
      'Google': 'bg-blue-500',
      'Microsoft': 'bg-green-500',
      'Amazon': 'bg-orange-500',
      'Meta': 'bg-blue-600',
      'Goldman Sachs': 'bg-yellow-600',
      'McKinsey': 'bg-purple-500'
    };
    
    blogPosts.forEach(post => {
      companyCounts[post.company] = (companyCounts[post.company] || 0) + 1;
    });
    
    return Object.entries(companyCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 6)
      .map(([company, count]) => ({
        name: company,
        count,
        color: companyColors[company] || 'bg-gray-500'
      }));
  }, [blogPosts]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Share Your Success,<br />
              <span className="text-blue-200">Guide Others</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect with peers, share placement experiences, and build a community where seniors guide juniors to achieve their dream careers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 text-lg">
                Explore Experiences
              </Button>
              <Link to="/create">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-3 text-lg"
                >
                  Share Your Story
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80 space-y-6">
            {/* Featured Companies */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                Featured Companies
              </h3>
              <div className="space-y-3">
                {featuredCompanies.map((company) => (
                  <div key={company.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${company.color}`}></div>
                      <span className="font-medium text-gray-900">{company.name}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {company.count} posts
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Tags */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 text-purple-600" />
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="outline" 
                    className="text-xs hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-colors"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort Options */}
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Latest Experiences</h2>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <div className="flex space-x-1">
                    {[
                      { key: 'recent', label: 'Recent', icon: Clock },
                      { key: 'popular', label: 'Popular', icon: TrendingUp },
                      { key: 'trending', label: 'Trending', icon: Star }
                    ].map(({ key, label, icon: Icon }) => (
                      <Button
                        key={key}
                        variant={sortBy === key ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setSortBy(key)}
                        className={`${
                          sortBy === key 
                            ? 'bg-blue-600 text-white' 
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <Icon className="w-4 h-4 mr-1" />
                        {label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="space-y-6">
              {blogPosts.map((post) => (
                <BlogCard key={post.id} {...post} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button 
                variant="outline" 
                size="lg"
                className="hover:bg-blue-50 hover:border-blue-300"
              >
                Load More Experiences
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
