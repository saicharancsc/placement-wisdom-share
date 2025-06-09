
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Plus, Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useCreateBlog, useBlog } from '@/hooks/useBlogs';
import { useUpdateBlog } from '@/hooks/useUserBlogs';
import Navigation from './Navigation';

const CreateBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const createBlogMutation = useCreateBlog();
  const updateBlogMutation = useUpdateBlog();
  const { data: existingBlog, isLoading: blogLoading } = useBlog(id || '', { enabled: !!id });
  
  const [formData, setFormData] = React.useState({
    title: '',
    company: '',
    college: '',
    role: '',
    content: '',
    tags: [] as string[]
  });
  const [newTag, setNewTag] = React.useState('');

  const isEditing = !!id;

  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  React.useEffect(() => {
    if (existingBlog && isEditing) {
      setFormData({
        title: existingBlog.title,
        company: existingBlog.company,
        college: existingBlog.college || '',
        role: existingBlog.role,
        content: existingBlog.content,
        tags: existingBlog.tags || []
      });
    }
  }, [existingBlog, isEditing]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      if (isEditing && id) {
        await updateBlogMutation.mutateAsync({ id, ...formData });
      } else {
        await createBlogMutation.mutateAsync(formData);
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving blog:', error);
    }
  };

  if (!user) {
    return null;
  }

  if (isEditing && blogLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="border border-border shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-border">
            <CardTitle className="text-2xl font-bold text-foreground">
              {isEditing ? 'Edit Your Experience' : 'Share Your Placement Experience'}
            </CardTitle>
            <p className="text-muted-foreground">
              {isEditing ? 'Update your interview journey, tips, and insights.' : 'Help your juniors by sharing your interview journey, tips, and insights.'}
            </p>
          </CardHeader>
          
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium text-foreground">
                  Title *
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., My Google SDE Interview Experience - Tips and Insights"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                  className="text-base border-input"
                />
              </div>

              {/* Company, College and Role */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-sm font-medium text-foreground">
                    Company *
                  </Label>
                  <Input
                    id="company"
                    placeholder="e.g., Google, Microsoft, Amazon"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    required
                    className="border-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="college" className="text-sm font-medium text-foreground">
                    College *
                  </Label>
                  <Input
                    id="college"
                    placeholder="e.g., IIT Delhi, BITS Pilani, NIT Trichy"
                    value={formData.college}
                    onChange={(e) => handleInputChange('college', e.target.value)}
                    required
                    className="border-input"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-sm font-medium text-foreground">
                    Role *
                  </Label>
                  <Select onValueChange={(value) => handleInputChange('role', value)} value={formData.role}>
                    <SelectTrigger className="border-input">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-border">
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
                <Label htmlFor="content" className="text-sm font-medium text-foreground">
                  Your Experience *
                </Label>
                <Textarea
                  id="content"
                  placeholder="Share your complete experience... Include details about:&#10;• Application process&#10;• Interview rounds and questions&#10;• Preparation tips&#10;• Timeline&#10;• Key learnings&#10;• Advice for juniors"
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  rows={15}
                  required
                  className="resize-none text-base leading-relaxed border-input"
                />
                <p className="text-xs text-muted-foreground">
                  Tip: Use line breaks to organize your content into sections
                </p>
              </div>

              {/* Tags */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground">Tags</Label>
                
                {/* Popular Tags */}
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">Popular tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <Button
                        key={tag}
                        type="button"
                        variant="outline"
                        size="sm"
                        className={`text-xs ${formData.tags.includes(tag) ? 'bg-blue-100 border-blue-300 text-blue-700' : 'border-input'}`}
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
                    className="flex-1 border-input"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addTag(newTag)}
                    className="border-input"
                  >
                    Add
                  </Button>
                </div>

                {/* Selected Tags */}
                {formData.tags.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Selected tags:</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1 bg-secondary text-secondary-foreground">
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1 text-muted-foreground hover:text-foreground"
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
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white flex-1 font-medium"
                  disabled={createBlogMutation.isPending || updateBlogMutation.isPending}
                >
                  {createBlogMutation.isPending || updateBlogMutation.isPending 
                    ? (isEditing ? 'Updating...' : 'Publishing...') 
                    : (isEditing ? 'Update Experience' : 'Publish Experience')
                  }
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                  className="border-input"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateBlog;
