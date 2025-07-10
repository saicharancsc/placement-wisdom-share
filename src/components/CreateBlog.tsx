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
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Navigation from './Navigation';

const CreateBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
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
    if (!authLoading && !user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to create or edit blog posts.",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [user, authLoading, navigate, toast]);

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
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to create or edit blog posts.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    // Validate required fields
    if (!formData.title.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a title for your experience.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.company.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter the company name.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.college.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your college name.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.role.trim()) {
      toast({
        title: "Validation Error",
        description: "Please select a role.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.content.trim()) {
      toast({
        title: "Validation Error",
        description: "Please share your experience content.",
        variant: "destructive",
      });
      return;
    }

    console.log('Submitting form with user:', user.id);
    console.log('Form data:', formData);

    try {
      // Double-check that user exists in users table before submitting
      const { data: userExists } = await supabase
        .from('users')
        .select('id')
        .eq('id', user.id)
        .single();
      
      if (!userExists) {
        // Create user record if it doesn't exist
        const { error: userInsertError } = await supabase
          .from('users')
          .insert({
            id: user.id,
            email: user.email!,
            name: user.user_metadata?.name || user.email!,
          });
        
        if (userInsertError) {
          console.error('Error creating user record:', userInsertError);
          toast({
            title: "Error",
            description: "Failed to create user record. Please try signing out and back in.",
            variant: "destructive",
          });
          return;
        }
      }

      if (isEditing && id) {
        await updateBlogMutation.mutateAsync({ id, ...formData });
        toast({
          title: "Success",
          description: "Your experience has been updated successfully!",
        });
      } else {
        await createBlogMutation.mutateAsync(formData);
        toast({
          title: "Success",
          description: "Your experience has been published successfully!",
        });
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving blog:', error);
      toast({
        title: "Error",
        description: isEditing ? "Failed to update your experience. Please try again." : "Failed to publish your experience. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

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
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <Card className="w-full">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="text-lg sm:text-2xl font-bold text-foreground mb-2 sm:mb-4">
              {isEditing ? 'Edit Experience' : 'Share Your Placement Experience'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Title</Label>
                <Input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g. My Google SDE Internship Experience"
                  required
                  disabled={createBlogMutation.isPending || updateBlogMutation.isPending}
                  className="text-xs sm:text-base"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Label htmlFor="company" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Company</Label>
                  <Input
                    id="company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    placeholder="e.g. Google"
                    required
                    disabled={createBlogMutation.isPending || updateBlogMutation.isPending}
                    className="text-xs sm:text-base"
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="college" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">College</Label>
                  <Input
                    id="college"
                    type="text"
                    value={formData.college}
                    onChange={(e) => handleInputChange('college', e.target.value)}
                    placeholder="e.g. IIT Bombay"
                    required
                    disabled={createBlogMutation.isPending || updateBlogMutation.isPending}
                    className="text-xs sm:text-base"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="role" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Role</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => handleInputChange('role', value)}
                  disabled={createBlogMutation.isPending || updateBlogMutation.isPending}
                >
                  <SelectTrigger className="w-full text-xs sm:text-base">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {popularRoles.map((role) => (
                      <SelectItem key={role} value={role} className="text-xs sm:text-base">{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="content" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Experience</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  placeholder="Share your experience in detail..."
                  rows={6}
                  required
                  disabled={createBlogMutation.isPending || updateBlogMutation.isPending}
                  className="text-xs sm:text-base"
                />
              </div>
              <div>
                <Label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Tags</Label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-0">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} className="text-xs sm:text-sm flex items-center gap-1">
                        {tag}
                        <button type="button" onClick={() => removeTag(tag)} className="ml-1 text-gray-400 hover:text-red-500">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add tag"
                      className="text-xs sm:text-base"
                      disabled={createBlogMutation.isPending || updateBlogMutation.isPending}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTag(newTag.trim());
                        }
                      }}
                    />
                    <Button type="button" size="sm" onClick={() => addTag(newTag.trim())} disabled={!newTag.trim() || createBlogMutation.isPending || updateBlogMutation.isPending}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 sm:gap-2 mt-2">
                  {popularTags.map((tag) => (
                    <Badge
                      key={tag}
                      className={`cursor-pointer text-xs sm:text-sm ${formData.tags.includes(tag) ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}
                      onClick={() => addTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Button
                  type="submit"
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium text-xs sm:text-base"
                  disabled={createBlogMutation.isPending || updateBlogMutation.isPending}
                >
                  {isEditing
                    ? updateBlogMutation.isPending
                      ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Updating...</>)
                      : 'Update Experience'
                    : createBlogMutation.isPending
                      ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Publishing...</>)
                      : 'Publish Experience'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto text-xs sm:text-base"
                  onClick={() => navigate(-1)}
                  disabled={createBlogMutation.isPending || updateBlogMutation.isPending}
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
