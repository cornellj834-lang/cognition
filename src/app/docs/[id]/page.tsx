'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Document interface
interface Document {
  id: string;
  title: string;
  content: string;
}

export default function DocumentPage() {
  const params = useParams();
  const { id } = params as { id: string };
  
  const [document, setDocument] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Fetch the document when the component mounts
    const fetchDocument = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // The id from useParams is already URL-encoded
        // We ensure it's properly formatted for the API request
        const encodedId = encodeURIComponent(decodeURIComponent(id));
        const response = await fetch(`/api/documents/${encodedId}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error response:', errorData);
          throw new Error(`Failed to fetch document: ${response.status}${errorData.error ? ` - ${errorData.error}` : ''}`);
        }
        
        const data = await response.json();
        setDocument(data);
      } catch (err) {
        console.error('Error fetching document:', err);
        setError(`Failed to load document. ${err instanceof Error ? err.message : 'Please try again later.'}`);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDocument();
  }, [id]);
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link 
          href="/" 
          className="text-blue-400 hover:text-blue-300 transition-colors flex items-center"
        >
          <svg 
            className="w-4 h-4 mr-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          Back to Documents
        </Link>
      </div>

      {loading && <div className="text-center py-20">Loading...</div>}
      
      {error && (
        <div className="bg-red-900/30 border border-red-700 text-red-100 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      )}
      
      {document && !loading && (
        <article className="prose prose-invert prose-lg max-w-none">
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {document.content}
          </ReactMarkdown>
        </article>
      )}
    </div>
  );
}