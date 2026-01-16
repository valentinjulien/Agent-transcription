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
      className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors"
    >
      {copied[itemKey] ? 'Copied!' : 'Copy'}
    </button>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Developer Settings</h2>
        <p className="text-slate-600">Use these credentials to integrate with n8n or other automation tools</p>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Keep your API key secure. Never share it publicly or commit it to version control.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-slate-700">API Key</label>
            <CopyButton text={credentials?.apiKey || ''} itemKey="apiKey" />
          </div>
          <code className="block bg-slate-50 p-3 rounded text-sm text-slate-800 break-all font-mono">
            {credentials?.apiKey || 'Not available'}
          </code>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-slate-700">n8n Webhook URL</label>
            <CopyButton text={credentials?.webhookUrl || ''} itemKey="webhookUrl" />
          </div>
          <code className="block bg-slate-50 p-3 rounded text-sm text-slate-800 break-all font-mono">
            {credentials?.webhookUrl || 'Not available'}
          </code>
          <p className="text-xs text-slate-500 mt-2">Use this endpoint in your n8n HTTP Request node</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-slate-700">Test Connection URL</label>
            <CopyButton text={credentials?.testUrl || ''} itemKey="testUrl" />
          </div>
          <code className="block bg-slate-50 p-3 rounded text-sm text-slate-800 break-all font-mono">
            {credentials?.testUrl || 'Not available'}
          </code>
          <p className="text-xs text-slate-500 mt-2">Test your API connection with this endpoint</p>
        </div>
      </div>

      <div className="bg-slate-800 text-white rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">n8n Integration Example</h3>
        <p className="text-slate-300 text-sm mb-4">Copy this JSON to configure your n8n HTTP Request node:</p>
        <pre className="bg-slate-900 p-4 rounded text-xs overflow-x-auto">
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
        <div className="mt-4 space-y-2 text-sm text-slate-300">
          <p><strong>Response format:</strong></p>
          <pre className="bg-slate-900 p-3 rounded text-xs">
{`{
  "title": "YouTube Transcript: ...",
  "content": "Full transcript text..."
}`}
          </pre>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
        <h3 className="font-semibold text-slate-800 mb-2">Supported Content Types</h3>
        <ul className="space-y-2 text-sm text-slate-600">
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            <div>
              <strong>youtube:</strong> Extract transcripts from YouTube videos
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            <div>
              <strong>web:</strong> Extract text content from any website
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DeveloperSettings;
