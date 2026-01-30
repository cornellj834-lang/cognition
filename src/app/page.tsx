'use client';

'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock data for now
const documents = [
  { id: 'daily-journal-2026-01-29', title: 'Daily Journal - 2026-01-29' },
  { id: 'project-cognition', title: 'Project: Cognition (The Second Brain)' },
];

function Sidebar() {
  return (
    <aside className="w-full bg-gray-900 p-4 sm:w-1/4 sm:max-w-sm sm:border-r sm:border-gray-700">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white">Cognition</h1>
        <p className="text-sm text-gray-400">Your Second Brain</p>
      </div>
      <nav>
        <ul>
          {documents.map((doc) => (
            <li key={doc.id} className="mb-2">
              <Link
                href={`/docs/${doc.id}`}
                className="block rounded-md px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              >
                {doc.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <main className="flex h-screen flex-col bg-gray-900 text-gray-200 font-sans sm:flex-row">
      {/* Mobile Header */}
      <header className="flex items-center justify-between border-b border-gray-700 p-4 sm:hidden">
        <h1 className="text-lg font-bold text-white">Cognition</h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="rounded-md p-2 text-gray-300 hover:bg-gray-800 hover:text-white"
        >
          {/* Simple Menu Icon */}
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </header>

      {/* Sidebar */}
      <div className={`sm:flex ${isSidebarOpen ? 'block' : 'hidden'}`}>
        <Sidebar />
      </div>

      {/* Main Content Viewer */}
      <section className="flex-1 p-4 sm:p-8">
        <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed border-gray-700">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-white sm:text-2xl">Select a document</h2>
            <p className="mt-1 text-sm text-gray-400">Choose a document from the sidebar to view its content.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
