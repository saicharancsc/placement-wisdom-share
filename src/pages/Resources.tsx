import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  content: string;
  resource_type: string;
  file_url?: string;
  link?: string;
  tags?: string[];
  author?: string;
  created_at?: string;
}

const Resources = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) setResources(data as Resource[]);
      setLoading(false);
    };
    fetchResources();
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <div className="flex-1 max-w-4xl mx-auto py-8 px-2">
        <h1 className="text-3xl font-bold mb-6 text-center">Resources</h1>
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : resources.length === 0 ? (
          <div className="text-center text-muted-foreground py-20">No resources found.</div>
        ) : (
          <div className="space-y-6">
            {resources.map(resource => (
              <Card key={resource.id} className="w-full">
                <CardHeader>
                  <CardTitle className="text-xl font-bold mb-1">{resource.title}</CardTitle>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="secondary">{resource.resource_type}</Badge>
                    {resource.tags && resource.tags.map(tag => (
                      <Badge key={tag} className="bg-blue-100 text-blue-700">{tag}</Badge>
                    ))}
                  </div>
                  <div className="text-muted-foreground text-sm mb-2">{resource.description}</div>
                  {resource.author && (
                    <div className="text-xs text-gray-500 mb-1">By {resource.author}</div>
                  )}
                  {resource.created_at && (
                    <div className="text-xs text-gray-400">{new Date(resource.created_at).toLocaleString()}</div>
                  )}
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="prose prose-sm max-w-none text-gray-800">
                    {resource.content.length > 200 ? (
                      <>
                        {resource.content.slice(0, 200)}... <br />
                      </>
                    ) : (
                      resource.content
                    )}
                  </div>
                  <div className="flex justify-end">
                    <a href={`/resource/${resource.id}`} className="text-blue-600 underline font-medium">Read More</a>
                  </div>
                  {(resource.file_url || resource.link) && (
                    <div className="mt-2">
                      {resource.file_url && (
                        <a href={resource.file_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline mr-4">View File</a>
                      )}
                      {resource.link && (
                        <a href={resource.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">External Link</a>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Resources; 