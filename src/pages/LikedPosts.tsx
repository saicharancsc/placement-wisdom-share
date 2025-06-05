
import React from 'react';
import Navigation from '../components/Navigation';
import BlogCard from '../components/BlogCard';
import { Heart } from 'lucide-react';

const LikedPosts = () => {
  // Mock liked posts data
  const likedPosts = [
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
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Heart className="w-8 h-8 text-red-500 fill-current" />
            <h1 className="text-3xl font-bold text-gray-900">Liked Posts</h1>
          </div>
          <p className="text-gray-600">
            All the posts you've liked are saved here for easy access.
          </p>
        </div>

        <div className="space-y-6">
          {likedPosts.length > 0 ? (
            likedPosts.map((post) => (
              <BlogCard key={post.id} {...post} />
            ))
          ) : (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No liked posts yet</h3>
              <p className="text-gray-600">
                Start exploring and like posts that interest you!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LikedPosts;
