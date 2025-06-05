
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    title: '',
    company: '',
    role: '',
    content: '',
    tags: [] as string[]
  });
  const [newTag, setNewTag] = React.useState('');

  const popularRoles = [
    "SDE Intern",
    "Software Engineer",
    "Data Scientist",
    "Product Manager",
    "Business Analyst",
    "Consultant",
    "Research Intern",
    "Marketing Intern",
    "Finance Intern",
    "Other"
  ];

  const popularTags = [
    "Coding", "System Design", "Behavioral", "Case Study", "On-Campus", 
    "Off-Campus", "Referral", "Tips", "Preparation", "Interview Experience"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
    setNewTag('');
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Blog post data:', formData);
    // Here you would typically submit to your backend
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Share Your Placement Experience
          </CardTitle>
          <p className="text-gray-600">
            Help your juniors by sharing your interview journey, tips, and insights.
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Title *
              </Label>
              <Input
                id="title"
                placeholder="e.g., My Google SDE Interview Experience - Tips and Insights"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
                className="text-base"
              />
            </div>

            {/* Company and Role */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company" className="text-sm font-medium">
                  Company *
                </Label>
                <Input
                  id="company"
                  placeholder="e.g., Google, Microsoft, Amazon"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-medium">
                  Role *
                </Label>
                <Select onValueChange={(value) => handleInputChange('role', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {popularRoles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <Label htmlFor="content" className="text-sm font-medium">
                Your Experience *
              </Label>
              <Textarea
                id="content"
                placeholder="Share your complete experience... Include details about:&#10;• Application process&#10;• Interview rounds and questions&#10;• Preparation tips&#10;• Timeline&#10;• Key learnings&#10;• Advice for juniors"
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                rows={15}
                required
                className="resize-none text-base leading-relaxed"
              />
              <p className="text-xs text-gray-500">
                Tip: Use line breaks to organize your content into sections
              </p>
            </div>

            {/* Tags */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Tags</Label>
              
              {/* Popular Tags */}
              <div className="space-y-2">
                <p className="text-xs text-gray-600">Popular tags:</p>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <Button
                      key={tag}
                      type="button"
                      variant="outline"
                      size="sm"
                      className={`text-xs ${formData.tags.includes(tag) ? 'bg-blue-100 border-blue-300' : ''}`}
                      onClick={() => addTag(tag)}
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Custom Tag Input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Add custom tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag(newTag);
                    }
                  }}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addTag(newTag)}
                >
                  Add
                </Button>
              </div>

              {/* Selected Tags */}
              {formData.tags.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs text-gray-600">Selected tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 text-gray-500 hover:text-gray-700"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex-1"
              >
                Publish Experience
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateBlog;
