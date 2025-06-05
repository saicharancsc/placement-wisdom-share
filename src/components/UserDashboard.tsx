
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Heart, 
  Bookmark, 
  FileText, 
  Eye, 
  MessageCircle, 
  TrendingUp,
  Calendar,
  Edit,
  Trash2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const userStats = {
    postsCount: 3,
    totalViews: 1250,
    totalLikes: 89,
    totalComments: 23
  };

  const userPosts = [
    {
      id: "1",
      title: "My Google SDE Intern Interview Experience - From Application to Offer",
      company: "Google",
      role: "SDE Intern",
      views: 450,
      likes: 47,
      comments: 12,
      createdAt: "3 days ago",
      status: "published"
    },
    {
      id: "2", 
      title: "Microsoft Data Science Internship - Complete Journey",
      company: "Microsoft",
      role: "Data Science Intern",
      views: 320,
      likes: 28,
      comments: 7,
      createdAt: "1 week ago",
      status: "published"
    },
    {
      id: "3",
      title: "Goldman Sachs Analyst Interview Tips and Experience",
      company: "Goldman Sachs",
      role: "Analyst",
      views: 480,
      likes: 14,
      comments: 4,
      createdAt: "2 weeks ago",
      status: "published"
    }
  ];

  const likedPosts = [
    {
      id: "4",
      title: "Amazon SDE Interview Experience - All Rounds Covered",
      author: "Rahul Kumar",
      company: "Amazon",
      role: "SDE",
      likes: 65,
      createdAt: "5 days ago"
    },
    {
      id: "5",
      title: "JP Morgan Summer Analyst Experience and Tips",
      author: "Sneha Patel",
      company: "JP Morgan",
      role: "Summer Analyst",
      likes: 42,
      createdAt: "1 week ago"
    }
  ];

  const bookmarkedPosts = [
    {
      id: "6",
      title: "Complete Guide to System Design Interviews",
      author: "Arjun Singh",
      company: "Meta",
      role: "SDE",
      likes: 156,
      createdAt: "3 days ago"
    },
    {
      id: "7",
      title: "McKinsey Case Interview Preparation Guide",
      author: "Priya Sharma",
      company: "McKinsey",
      role: "Business Analyst",
      likes: 89,
      createdAt: "1 week ago"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="text-2xl">PS</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Priya Sharma</h1>
              <p className="text-gray-600 mb-4">
                Computer Science Student at IIT Delhi | Sharing placement experiences to help juniors
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <FileText className="w-5 h-5 text-blue-600 mr-1" />
                    <span className="text-2xl font-bold text-gray-900">{userStats.postsCount}</span>
                  </div>
                  <p className="text-sm text-gray-600">Posts</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Eye className="w-5 h-5 text-green-600 mr-1" />
                    <span className="text-2xl font-bold text-gray-900">{userStats.totalViews}</span>
                  </div>
                  <p className="text-sm text-gray-600">Views</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Heart className="w-5 h-5 text-red-600 mr-1" />
                    <span className="text-2xl font-bold text-gray-900">{userStats.totalLikes}</span>
                  </div>
                  <p className="text-sm text-gray-600">Likes</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <MessageCircle className="w-5 h-5 text-purple-600 mr-1" />
                    <span className="text-2xl font-bold text-gray-900">{userStats.totalComments}</span>
                  </div>
                  <p className="text-sm text-gray-600">Comments</p>
                </div>
              </div>
            </div>
            
            <Link to="/create">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Write New Post
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Content Tabs */}
      <Tabs defaultValue="my-posts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100">
          <TabsTrigger value="my-posts" className="data-[state=active]:bg-white">
            My Posts
          </TabsTrigger>
          <TabsTrigger value="liked" className="data-[state=active]:bg-white">
            Liked Posts
          </TabsTrigger>
          <TabsTrigger value="bookmarked" className="data-[state=active]:bg-white">
            Bookmarked
          </TabsTrigger>
        </TabsList>

        {/* My Posts */}
        <TabsContent value="my-posts" className="space-y-4">
          {userPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="outline">{post.company}</Badge>
                      <Badge variant="secondary">{post.role}</Badge>
                      <Badge 
                        variant={post.status === 'published' ? 'default' : 'secondary'}
                        className={post.status === 'published' ? 'bg-green-100 text-green-700' : ''}
                      >
                        {post.status}
                      </Badge>
                    </div>
                    
                    <Link to={`/blog/${post.id}`}>
                      <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-2">
                        {post.title}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {post.createdAt}
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {post.views} views
                      </div>
                      <div className="flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        {post.likes} likes
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {post.comments} comments
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Liked Posts */}
        <TabsContent value="liked" className="space-y-4">
          {likedPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="outline">{post.company}</Badge>
                  <Badge variant="secondary">{post.role}</Badge>
                </div>
                
                <Link to={`/blog/${post.id}`}>
                  <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-2">
                    {post.title}
                  </h3>
                </Link>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>by {post.author}</span>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.createdAt}
                    </div>
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 mr-1 text-red-500" />
                      {post.likes} likes
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm">
                    <Heart className="w-4 h-4 text-red-500 fill-current" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Bookmarked Posts */}
        <TabsContent value="bookmarked" className="space-y-4">
          {bookmarkedPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="outline">{post.company}</Badge>
                  <Badge variant="secondary">{post.role}</Badge>
                </div>
                
                <Link to={`/blog/${post.id}`}>
                  <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-2">
                    {post.title}
                  </h3>
                </Link>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>by {post.author}</span>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.createdAt}
                    </div>
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      {post.likes} likes
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm">
                    <Bookmark className="w-4 h-4 text-blue-500 fill-current" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
