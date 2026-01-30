import Link from 'next/link';

export default function Home() {
  // Mock data for now. In the future, this will be fetched from an API.
  const documents = [
    { id: 'daily-journal-2026-01-29', title: 'Daily Journal - 2026-01-29' },
    { id: 'project-cognition', title: 'Project: Cognition (The Second Brain)' },
  ];

  return (
    <main className="flex h-screen bg-gray-900 text-gray-200 font-sans">
      {/* Sidebar */}
      <aside className="w-1/4 max-w-sm border-r border-gray-700 p-4">
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

      {/* Main Content Viewer */}
      <section className="flex-1 p-8">
        <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed border-gray-700">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white">Select a document</h2>
            <p className="mt-1 text-gray-400">Choose a document from the sidebar to view its content.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
