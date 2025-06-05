
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Heart, MessageCircle, Bookmark, Calendar, Building2, Share2 } from 'lucide-react';
import { useParams } from 'react-router-dom';

const BlogPost = () => {
  const { id } = useParams();
  const [liked, setLiked] = React.useState(false);
  const [bookmarked, setBookmarked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(47);
  const [comment, setComment] = React.useState('');

  // Mock blog post data
  const blogPost = {
    id: id,
    title: "My Google SDE Intern Interview Experience - From Application to Offer",
    company: "Google",
    role: "SDE Intern",
    author: "Priya Sharma",
    authorAvatar: "/placeholder.svg",
    content: `
    <div class="prose max-w-none">
      <h2>Background</h2>
      <p>I'm a 3rd-year Computer Science student from IIT Delhi. I applied for Google's Summer Intern Program 2024 through their university portal in August 2023.</p>
      
      <h2>Application Process</h2>
      <p>The application was straightforward - just had to submit my resume, transcripts, and a cover letter. Make sure your resume highlights your projects and any open-source contributions.</p>
      
      <h2>Interview Rounds</h2>
      
      <h3>Round 1: Online Assessment (September 2023)</h3>
      <p>Duration: 90 minutes<br/>
      Questions: 2 coding problems</p>
      <ul>
        <li><strong>Problem 1:</strong> Array manipulation (Medium difficulty) - Similar to LeetCode #238</li>
        <li><strong>Problem 2:</strong> Tree traversal with condition (Hard difficulty)</li>
      </ul>
      <p><strong>Tip:</strong> Practice on LeetCode regularly. Focus on medium to hard problems involving arrays, trees, and graphs.</p>
      
      <h3>Round 2: Technical Interview 1 (October 2023)</h3>
      <p>Duration: 45 minutes<br/>
      Platform: Google Meet with shared document</p>
      <p>The interviewer was very friendly and started with basic introductions. Then we moved to coding:</p>
      <ul>
        <li>Problem: Design a data structure for LRU Cache</li>
        <li>Follow-up: Optimize for concurrent access</li>
      </ul>
      <p><strong>Tip:</strong> Think out loud! Explain your approach before coding and discuss time/space complexity.</p>
      
      <h3>Round 3: Technical Interview 2 (October 2023)</h3>
      <p>Duration: 45 minutes</p>
      <p>This round focused more on system design concepts:</p>
      <ul>
        <li>Question: How would you design a URL shortener like bit.ly?</li>
        <li>Discussed database design, caching strategies, and load balancing</li>
      </ul>
      <p><strong>Tip:</strong> For interns, they don't expect full system design knowledge, but basic understanding of databases, caching, and scalability helps.</p>
      
      <h2>Key Preparation Tips</h2>
      <ol>
        <li><strong>Data Structures & Algorithms:</strong> Master arrays, linked lists, trees, graphs, and dynamic programming</li>
        <li><strong>Practice Platforms:</strong> LeetCode (300+ problems), GeeksforGeeks, InterviewBit</li>
        <li><strong>Mock Interviews:</strong> Practice with friends or use platforms like Pramp</li>
        <li><strong>Projects:</strong> Have 2-3 solid projects you can explain in detail</li>
        <li><strong>Communication:</strong> Practice explaining complex concepts simply</li>
      </ol>
      
      <h2>Result</h2>
      <p>I received the offer call in November 2023! The internship was for Summer 2024 in their Bangalore office.</p>
      
      <h2>Final Advice</h2>
      <p>Don't get discouraged by rejections. I was rejected by Microsoft and Amazon before getting into Google. Each interview is a learning experience. Stay consistent with your preparation and believe in yourself!</p>
      
      <p>Feel free to ask any questions in the comments below. Happy to help!</p>
    </div>
    `,
    tags: ["Google", "SDE Intern", "Interview Experience", "Coding", "System Design"],
    likes: 47,
    comments: 12,
    createdAt: "3 days ago"
  };

  const mockComments = [
    {
      id: 1,
      author: "Rahul Kumar",
      avatar: "/placeholder.svg",
      content: "Thanks for sharing this! Really helpful. How much time did you spend preparing for system design?",
      time: "2 days ago",
      likes: 5
    },
    {
      id: 2,
      author: "Sneha Patel",
      avatar: "/placeholder.svg",
      content: "Congratulations! This gives me hope. I'm preparing for next year's internships.",
      time: "1 day ago",
      likes: 3
    }
  ];

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      console.log('Comment submitted:', comment);
      setComment('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={blogPost.authorAvatar} />
                <AvatarFallback>{blogPost.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-gray-900">{blogPost.author}</p>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span>{blogPost.createdAt}</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBookmark}
                className={`${bookmarked ? 'text-blue-600' : 'text-gray-400'} hover:text-blue-600`}
              >
                <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-gray-500" />
              <span className="font-semibold text-lg text-gray-900">{blogPost.company}</span>
              <Badge className="bg-blue-100 text-blue-700">
                {blogPost.role}
              </Badge>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">
              {blogPost.title}
            </h1>
            
            <div className="flex flex-wrap gap-2">
              {blogPost.tags.map((tag, index) => (
                <Badge key={index} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div 
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blogPost.content }}
          />
          
          <div className="flex items-center justify-between pt-8 border-t border-gray-200 mt-8">
            <div className="flex items-center space-x-6">
              <Button
                variant="ghost"
                onClick={handleLike}
                className={`${liked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
              >
                <Heart className={`w-5 h-5 mr-2 ${liked ? 'fill-current' : ''}`} />
                {likeCount} Likes
              </Button>
              <Button variant="ghost" className="text-gray-500 hover:text-blue-500">
                <MessageCircle className="w-5 h-5 mr-2" />
                {blogPost.comments} Comments
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Comments ({mockComments.length})</h3>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add Comment */}
          <div className="space-y-3">
            <Textarea
              placeholder="Share your thoughts or ask a question..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="resize-none"
            />
            <Button 
              onClick={handleCommentSubmit}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Post Comment
            </Button>
          </div>
          
          {/* Comments List */}
          <div className="space-y-4">
            {mockComments.map((comment) => (
              <div key={comment.id} className="border-l-2 border-gray-100 pl-4">
                <div className="flex items-start space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={comment.avatar} />
                    <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-sm">{comment.author}</span>
                      <span className="text-xs text-gray-500">{comment.time}</span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed mb-2">{comment.content}</p>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-500 p-0 h-auto">
                      <Heart className="w-3 h-3 mr-1" />
                      {comment.likes}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogPost;
