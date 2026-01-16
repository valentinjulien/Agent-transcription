import React, { useState } from 'react';

function ExtractionForm({ onExtract, loading }) {
  const [type, setType] = useState('youtube');
  const [url, setUrl] = useState('');
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url && apiKey) {
      onExtract(type, url, apiKey);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Content Type
        </label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="youtube"
              checked={type === 'youtube'}
              onChange={(e) => setType(e.target.value)}
              className="mr-2 text-blue-500"
            />
            <span className="text-slate-700">YouTube Video</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="web"
              checked={type === 'web'}
              onChange={(e) => setType(e.target.value)}
              className="mr-2 text-blue-500"
            />
            <span className="text-slate-700">Website</span>
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="url" className="block text-sm font-medium text-slate-700 mb-2">
          URL
        </label>
        <input
          type="url"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={type === 'youtube' ? 'https://www.youtube.com/watch?v=...' : 'https://example.com'}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          required
        />
      </div>

      <div>
        <label htmlFor="apiKey" className="block text-sm font-medium text-slate-700 mb-2">
          API Key
        </label>
        <input
          type="password"
          id="apiKey"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your API key"
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Extracting...
          </span>
        ) : (
          'Extract Content'
        )}
      </button>
    </form>
  );
}

export default ExtractionForm;
