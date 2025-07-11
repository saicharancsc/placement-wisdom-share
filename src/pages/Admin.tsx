import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';

const RESOURCE_TYPES = [
  'PDF', 'Video', 'Link', 'Image', 'Note', 'Slide'
];
const TAG_OPTIONS = [
  'React', 'DSA', 'HR Round', 'JavaScript', 'Resume', 'Interview', 'Aptitude', 'System Design', 'Coding', 'Placement', 'Tips'
];

const Admin = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    content: '',
    resourceType: '',
    file: null as File | null,
    link: '',
    link2: '',
    link3: '',
    tags: [] as string[],
    author: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (field: string, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm(prev => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleTagToggle = (tag: string) => {
    setForm(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.title || !form.description || !form.content || !form.resourceType) {
      setError('Please fill all required fields.');
      return;
    }
    if (!form.file && !form.link) {
      setError('Please upload a file or provide a link.');
      return;
    }
    let file_url = '';
    if (form.file) {
      const fileExt = form.file.name.split('.').pop();
      const fileName = `${Date.now()}_${form.file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage.from('resources').upload(fileName, form.file);
      if (uploadError) {
        setError('File upload failed: ' + uploadError.message);
        return;
      }
      const { data: publicUrlData } = supabase.storage.from('resources').getPublicUrl(fileName);
      file_url = publicUrlData?.publicUrl || '';
    }
    const { error: insertError } = await supabase.from('resources').insert([
      {
        title: form.title,
        description: form.description,
        content: form.content,
        resource_type: form.resourceType,
        file_url: file_url || null,
        link: form.link || null,
        link2: form.link2 || null,
        link3: form.link3 || null,
        tags: form.tags,
        author: form.author || null,
      }
    ]);
    if (insertError) {
      setError('Failed to save resource: ' + insertError.message);
      return;
    }
    setSuccess('Resource submitted successfully!');
    setForm({
      title: '', description: '', content: '', resourceType: '', file: null, link: '', tags: [], author: ''
    });
  };

  // Hardcoded admin access (for demo)
  // In real app, check user role/auth here

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <div className="flex-1 flex justify-center items-start py-8 px-2">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Admin: Add Resource/Blog</CardTitle>
            <p className="text-muted-foreground text-sm mt-2">Fill out the form to add a new resource or blog post.</p>
          </CardHeader>
          <CardContent>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block font-medium mb-1">Title <span className="text-red-500">*</span></label>
                <Input value={form.title} onChange={e => handleChange('title', e.target.value)} required />
              </div>
              <div>
                <label className="block font-medium mb-1">Description <span className="text-red-500">*</span></label>
                <Textarea value={form.description} onChange={e => handleChange('description', e.target.value)} required rows={2} />
              </div>
              <div>
                <label className="block font-medium mb-1">Content/Body (Markdown) <span className="text-red-500">*</span></label>
                <Textarea value={form.content} onChange={e => handleChange('content', e.target.value)} required rows={6} placeholder="You can use Markdown formatting here..." />
              </div>
              <div>
                <label className="block font-medium mb-1">Resource Type <span className="text-red-500">*</span></label>
                <select className="w-full border rounded px-3 py-2" value={form.resourceType} onChange={e => handleChange('resourceType', e.target.value)} required>
                  <option value="">Select type...</option>
                  {RESOURCE_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block font-medium mb-1">File Upload</label>
                  <Input type="file" accept=".pdf,.jpg,.jpeg,.png,.gif,.doc,.docx,.ppt,.pptx,.txt,.md" onChange={handleFileChange} />
                </div>
                <div className="flex-1">
                  <label className="block font-medium mb-1">Or Link</label>
                  <Input type="url" value={form.link} onChange={e => handleChange('link', e.target.value)} placeholder="https://..." />
                  <label className="block font-medium mb-1 mt-2">Additional Link 1</label>
                  <Input type="url" value={form.link2} onChange={e => handleChange('link2', e.target.value)} placeholder="https://..." />
                  <label className="block font-medium mb-1 mt-2">Additional Link 2</label>
                  <Input type="url" value={form.link3} onChange={e => handleChange('link3', e.target.value)} placeholder="https://..." />
                </div>
              </div>
              {form.link && (form.link.includes('youtube.com') || form.link.includes('youtu.be')) && (
                <div className="mt-4">
                  <label className="block font-medium mb-1">YouTube Preview</label>
                  <div className="w-full rounded-lg overflow-hidden border" style={{ aspectRatio: '16/9', minHeight: '320px' }}>
                    <iframe
                      src={`https://www.youtube.com/embed/${getYouTubeId(form.link)}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full min-h-[320px]"
                      style={{ minHeight: '320px' }}
                    ></iframe>
                  </div>
                </div>
              )}
              <div>
                <label className="block font-medium mb-1">Tags/Topics</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {TAG_OPTIONS.map(tag => (
                    <button
                      type="button"
                      key={tag}
                      className={`px-3 py-1 rounded-full border text-xs ${form.tags.includes(tag) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300'}`}
                      onClick={() => handleTagToggle(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block font-medium mb-1">Author Name</label>
                <Input value={form.author} onChange={e => handleChange('author', e.target.value)} placeholder="e.g. Sharify Team or your name" />
              </div>
              {error && <div className="text-red-600 text-sm text-center">{error}</div>}
              {success && <div className="text-green-600 text-sm text-center">{success}</div>}
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">Submit Resource</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

function getYouTubeId(url: string): string | null {
  const regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[1].length === 11) ? match[1] : null;
}

export default Admin; 