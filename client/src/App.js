import React, { useState } from 'react';
import YouTubeExtractor from './components/YouTubeExtractor';
import WebExtractor from './components/WebExtractor';
import DeveloperSettings from './components/DeveloperSettings';

function App() {
  const [activeTab, setActiveTab] = useState('extract');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">Content Extraction Tool</h1>
          <p className="text-slate-400 text-lg">Extract transcripts from YouTube videos and text from websites with ease</p>
        </header>

        <div className="bg-slate-800/50 backdrop-blur rounded-xl shadow-2xl overflow-hidden border border-slate-700">
          <div className="flex border-b border-slate-700">
            <button
              onClick={() => setActiveTab('extract')}
              className={`flex-1 px-6 py-4 font-medium transition-all duration-200 ${
                activeTab === 'extract'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-300 hover:bg-slate-700/50'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Extract Content
              </span>
            </button>
            <button
              onClick={() => setActiveTab('developer')}
              className={`flex-1 px-6 py-4 font-medium transition-all duration-200 ${
                activeTab === 'developer'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-300 hover:bg-slate-700/50'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                API Settings
              </span>
            </button>
          </div>

          <div className="p-8">
            {activeTab === 'extract' ? (
              <div className="space-y-8">
                <YouTubeExtractor />
                <div className="border-t border-slate-700 my-8"></div>
                <WebExtractor />
              </div>
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
