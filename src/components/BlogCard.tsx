
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, Bookmark, Calendar, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogCardProps {
  id: string;
  title: string;
  company: string;
  role: string;
  author: string;
  authorAvatar?: string;
  excerpt: string;
  tags: string[];
  likes: number;
  comments: number;
  createdAt: string;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  title,
  company,
  role,
  author,
  authorAvatar,
  excerpt,
  tags,
  likes,
  comments,
  createdAt,
  isLiked = false,
  isBookmarked = false,
}) => {
  const [liked, setLiked] = React.useState(isLiked);
  const [bookmarked, setBookmarked] = React.useState(isBookmarked);
  const [likeCount, setLikeCount] = React.useState(likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={authorAvatar} />
              <AvatarFallback>{author.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-gray-900">{author}</p>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Calendar className="w-3 h-3" />
                <span>{createdAt}</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBookmark}
            className={`${bookmarked ? 'text-blue-600' : 'text-gray-400'} hover:text-blue-600`}
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-gray-500" />
            <span className="font-semibold text-gray-900">{company}</span>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              {role}
            </Badge>
          </div>
          
          <Link to={`/blog/${id}`}>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
              {title}
            </h3>
          </Link>
          
          <p className="text-gray-600 line-clamp-3 leading-relaxed">
            {excerpt}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`${liked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
              >
                <Heart className={`w-4 h-4 mr-1 ${liked ? 'fill-current' : ''}`} />
                {likeCount}
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-500">
                <MessageCircle className="w-4 h-4 mr-1" />
                {comments}
              </Button>
            </div>
            
            <Link to={`/blog/${id}`}>
              <Button variant="outline" size="sm" className="group-hover:bg-blue-50 group-hover:border-blue-200">
                Read More
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
