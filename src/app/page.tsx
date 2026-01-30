'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Document interface
interface Document {
  id: string;
  title: string;
  path: string;
}

// Helper function to create a safe slug from document ID
function createSlug(id: string) {
  // This matches what the server expects
  return id;
}

function SidebarContent({ documents }: { documents: Document[] }) {
  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white">Cognition</h1>
        <p className="text-sm text-gray-400">Your Second Brain</p>
      </div>
      
      {documents.length === 0 ? (
        <div className="text-gray-400 text-sm">No documents found</div>
      ) : (
        <nav>
          <ul>
            {documents.map((doc) => (
              <li key={doc.id} className="mb-2">
                <Link
                  href={`/docs/${createSlug(doc.id)}`}
                  className="block rounded-md px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                >
                  {doc.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}

export default function Home() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Fetch documents when the component mounts
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching documents list');
        const response = await fetch('/api/documents');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch documents: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Received documents:', data);
        setDocuments(data);
      } catch (err) {
        console.error('Error fetching documents:', err);
        setError('Failed to load documents. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDocuments();
  }, []);

  return (
    <main className="flex h-screen bg-gray-900 text-gray-200 font-sans">
      {/* Static Sidebar for Desktop */}
      <aside className="hidden w-1/4 max-w-sm border-r border-gray-700 sm:block">
        {loading ? (
          <div className="p-4">
            <div className="mb-6">
              <h1 className="text-xl font-bold text-white">Cognition</h1>
              <p className="text-sm text-gray-400">Your Second Brain</p>
            </div>
            <p className="text-gray-400">Loading documents...</p>
          </div>
        ) : error ? (
          <div className="p-4">
            <div className="mb-6">
              <h1 className="text-xl font-bold text-white">Cognition</h1>
              <p className="text-sm text-gray-400">Your Second Brain</p>
            </div>
            <div className="text-red-400">{error}</div>
          </div>
        ) : (
          <SidebarContent documents={documents} />
        )}
      </aside>

      {/* Mobile Header & Overlay Container */}
      <div className="flex flex-col w-full sm:hidden">
        <header className="flex w-full items-center justify-between border-b border-gray-700 p-4">
          <h1 className="text-lg font-bold text-white">Cognition</h1>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-md p-2 text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </header>

        {/* Mobile Sliding Sidebar */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-20 flex">
            <aside className="w-3/4 max-w-xs bg-gray-900 border-r border-gray-700">
              {loading ? (
                <div className="p-4">
                  <div className="mb-6">
                    <h1 className="text-xl font-bold text-white">Cognition</h1>
                    <p className="text-sm text-gray-400">Your Second Brain</p>
                  </div>
                  <p className="text-gray-400">Loading documents...</p>
                </div>
              ) : error ? (
                <div className="p-4">
                  <div className="mb-6">
                    <h1 className="text-xl font-bold text-white">Cognition</h1>
                    <p className="text-sm text-gray-400">Your Second Brain</p>
                  </div>
                  <div className="text-red-400">{error}</div>
                </div>
              ) : (
                <SidebarContent documents={documents} />
              )}
            </aside>
            <div className="flex-1 bg-black bg-opacity-50" onClick={() => setIsSidebarOpen(false)}></div>
          </div>
        )}
      </div>

      {/* Main Content Viewer */}
      <section className="w-full flex-1 p-4 sm:p-8">
        <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed border-gray-700">
          <div className="text-center">
            {loading ? (
              <p className="text-lg text-gray-400">Loading documents...</p>
            ) : error ? (
              <div className="text-red-400">
                <h2 className="text-lg font-semibold sm:text-2xl">{error}</h2>
                <p className="mt-1">Please try again later.</p>
              </div>
            ) : (
              <>
                <h2 className="text-lg font-semibold text-white sm:text-2xl">Select a document</h2>
                <p className="mt-1 text-sm text-gray-400">Choose a document from the sidebar to view its content.</p>
                <p className="mt-4 text-sm text-gray-500">
                  {documents.length} document{documents.length !== 1 ? 's' : ''} available
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}