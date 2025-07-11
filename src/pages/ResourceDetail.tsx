import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

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

function getYouTubeId(url: string): string | null {
  const regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[1].length === 11) ? match[1] : null;
}

const ResourceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [resource, setResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResource = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('id', id)
        .single();
      if (!error && data) setResource(data as Resource);
      setLoading(false);
    };
    if (id) fetchResource();
  }, [id]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <div className="flex-1 max-w-2xl mx-auto py-8 px-2">
        <Link to="/resources" className="flex items-center text-blue-600 hover:underline mb-4">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Resources
        </Link>
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : !resource ? (
          <div className="text-center text-gray-500 py-20">Resource not found.</div>
        ) : (
          <Card className="w-full bg-blue-50">
            <CardHeader>
              <CardTitle className="text-2xl font-bold mb-1">{resource.title}</CardTitle>
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
              <div className="prose max-w-none text-gray-800" style={{ whiteSpace: 'pre-line' }}>
                {resource.content.split('\n').map((line, idx) => (
                  <React.Fragment key={idx}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </div>
              {(resource.file_url || resource.link) && (
                <div className="mt-2">
                  {resource.file_url && (
                    <a href={resource.file_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline mr-4">View File</a>
                  )}
                  {resource.link && (resource.link.includes('youtube.com') || resource.link.includes('youtu.be')) && getYouTubeId(resource.link) && (
                    <div className="w-full rounded-lg overflow-hidden border mb-4" style={{ aspectRatio: '16/9', minHeight: '320px' }}>
                      <iframe
                        src={`https://www.youtube.com/embed/${getYouTubeId(resource.link)}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full min-h-[320px]"
                        style={{ minHeight: '320px' }}
                      ></iframe>
                    </div>
                  )}
                  {resource.link && (
                    <a href={resource.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">External Link</a>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ResourceDetail; 