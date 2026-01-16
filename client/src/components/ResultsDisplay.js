import React, { useState } from 'react';

function ResultsDisplay({ result }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = result.transcript || result.text || '';
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const content = result.transcript || result.text || '';
  const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">Results</h3>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
        >
          {copied ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-slate-50 p-4 rounded-lg">
          <p className="text-xs text-slate-500 uppercase mb-1">Type</p>
          <p className="text-lg font-medium text-slate-800 capitalize">{result.type}</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg">
          <p className="text-xs text-slate-500 uppercase mb-1">Word Count</p>
          <p className="text-lg font-medium text-slate-800">{wordCount.toLocaleString()}</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg">
          <p className="text-xs text-slate-500 uppercase mb-1">Characters</p>
          <p className="text-lg font-medium text-slate-800">{content.length.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg p-4 max-h-96 overflow-y-auto">
        <p className="text-xs text-slate-500 uppercase mb-2">Content</p>
        <p className="text-slate-700 whitespace-pre-wrap break-words">{content}</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-xs text-blue-600 uppercase mb-1">Source URL</p>
        <a
          href={result.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:text-blue-800 underline break-all"
        >
          {result.url}
        </a>
      </div>
    </div>
  );
}

export default ResultsDisplay;
