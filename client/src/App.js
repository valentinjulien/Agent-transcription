import React, { useState } from 'react';
import ExtractionForm from './components/ExtractionForm';
import DeveloperSettings from './components/DeveloperSettings';
import ResultsDisplay from './components/ResultsDisplay';

function App() {
  const [activeTab, setActiveTab] = useState('extract');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleExtract = async (type, url, apiKey) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://localhost:3000/api/extract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey
        },
        body: JSON.stringify({ type, url })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Extraction failed');
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Content Extraction Tool</h1>
          <p className="text-slate-600">Extract transcripts from YouTube videos and text from websites</p>
        </header>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex border-b border-slate-200">
            <button
              onClick={() => setActiveTab('extract')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'extract'
                  ? 'bg-blue-500 text-white'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Extract Content
            </button>
            <button
              onClick={() => setActiveTab('developer')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'developer'
                  ? 'bg-blue-500 text-white'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Developer Settings
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'extract' ? (
              <>
                <ExtractionForm onExtract={handleExtract} loading={loading} />
                {error && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 font-medium">Error</p>
                    <p className="text-red-600 text-sm mt-1">{error}</p>
                  </div>
                )}
                {result && <ResultsDisplay result={result} />}
              </>
            ) : (
              <DeveloperSettings />
            )}
          </div>
        </div>

        <footer className="mt-8 text-center text-slate-500 text-sm">
          <p>Built for n8n integration and content automation</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
