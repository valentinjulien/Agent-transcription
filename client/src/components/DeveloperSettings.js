import React, { useState, useEffect } from 'react';

function DeveloperSettings() {
  const [credentials, setCredentials] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState({});

  useEffect(() => {
    fetchCredentials();
  }, []);

  const fetchCredentials = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/credentials');
      const data = await response.json();
      setCredentials(data);
    } catch (error) {
      console.error('Failed to fetch credentials:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied({ ...copied, [key]: true });
    setTimeout(() => {
      setCopied({ ...copied, [key]: false });
    }, 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const CopyButton = ({ text, itemKey }) => (
    <button
      onClick={() => copyToClipboard(text, itemKey)}
      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-all duration-200 flex items-center gap-2"
    >
      {copied[itemKey] ? (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy
        </>
      )}
    </button>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-purple-600/20 rounded-lg">
          <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">API Settings</h2>
          <p className="text-slate-400 text-sm">Credentials for n8n and automation integrations</p>
        </div>
      </div>

      <div className="bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-amber-300">
              Keep your API key secure. Never share it publicly or commit it to version control.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-5">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-slate-300 uppercase tracking-wide">API Key</label>
            <CopyButton text={credentials?.apiKey || ''} itemKey="apiKey" />
          </div>
          <code className="block bg-slate-900/50 p-4 rounded-lg text-sm text-slate-200 break-all font-mono border border-slate-600">
            {credentials?.apiKey || 'Not available'}
          </code>
        </div>

        <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-5">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-slate-300 uppercase tracking-wide">n8n Webhook URL</label>
            <CopyButton text={credentials?.webhookUrl || ''} itemKey="webhookUrl" />
          </div>
          <code className="block bg-slate-900/50 p-4 rounded-lg text-sm text-slate-200 break-all font-mono border border-slate-600">
            {credentials?.webhookUrl || 'Not available'}
          </code>
          <p className="text-xs text-slate-400 mt-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Use this endpoint in your n8n HTTP Request node
          </p>
        </div>

        <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-5">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-slate-300 uppercase tracking-wide">Test Connection URL</label>
            <CopyButton text={credentials?.testUrl || ''} itemKey="testUrl" />
          </div>
          <code className="block bg-slate-900/50 p-4 rounded-lg text-sm text-slate-200 break-all font-mono border border-slate-600">
            {credentials?.testUrl || 'Not available'}
          </code>
          <p className="text-xs text-slate-400 mt-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Test your API connection with this endpoint
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          n8n Integration Example
        </h3>
        <p className="text-slate-400 text-sm mb-4">Copy this JSON to configure your n8n HTTP Request node:</p>
        <pre className="bg-slate-900/70 p-4 rounded-lg text-xs overflow-x-auto border border-slate-600 text-slate-300">
{`{
  "method": "POST",
  "url": "${credentials?.webhookUrl || 'YOUR_WEBHOOK_URL'}",
  "headers": {
    "Content-Type": "application/json",
    "x-api-key": "${credentials?.apiKey || 'YOUR_API_KEY'}"
  },
  "body": {
    "type": "youtube",
    "url": "https://www.youtube.com/watch?v=VIDEO_ID"
  }
}`}
        </pre>
        <div className="mt-4 space-y-2 text-sm">
          <p className="text-slate-300 font-semibold">Response format:</p>
          <pre className="bg-slate-900/70 p-3 rounded-lg text-xs border border-slate-600 text-slate-300">
{`{
  "title": "YouTube Transcript: ...",
  "content": "Full transcript text..."
}`}
          </pre>
        </div>
      </div>

      <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-5">
        <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
          <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Supported Content Types
        </h3>
        <ul className="space-y-3 text-sm">
          <li className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg">
            <span className="text-blue-500 text-lg">•</span>
            <div>
              <strong className="text-slate-200">youtube:</strong>
              <span className="text-slate-400 ml-2">Extract transcripts from YouTube videos</span>
            </div>
          </li>
          <li className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg">
            <span className="text-emerald-500 text-lg">•</span>
            <div>
              <strong className="text-slate-200">web:</strong>
              <span className="text-slate-400 ml-2">Extract text content from any website</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DeveloperSettings;
