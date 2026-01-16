require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
const YouTubeTranscript = require('youtube-transcript').YouTubeTranscript;

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

// Middleware - Allow CORS for external requests (n8n)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-api-key'],
  credentials: false
}));
app.use(express.json());

// API Key Authentication Middleware
const authenticateAPIKey = (req, res, next) => {
  const providedAPIKey = req.headers['x-api-key'];
  if (providedAPIKey && providedAPIKey === API_KEY) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized: Invalid API Key' });
  }
};

// POST endpoint for content extraction
app.post('/api/extract', authenticateAPIKey, async (req, res) => {
  const { type, url } = req.body;

  if (!type || !url) {
    return res.status(400).json({ error: 'Missing required fields: type and url' });
  }

  try {
    if (type === 'youtube') {
      const transcript = await extractYouTubeTranscript(url);
      res.json({ type: 'youtube', url, transcript });
    } else if (type === 'web') {
      const text = await extractWebText(url);
      res.json({ type: 'web', url, text });
    } else {
      res.status(400).json({ error: 'Invalid type. Use "youtube" or "web"' });
    }
  } catch (error) {
    console.error('Extraction Error:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

// Extract YouTube transcript
async function extractYouTubeTranscript(videoUrl) {
  try {
    const videoId = extractYouTubeVideoId(videoUrl);
    if (!videoId) {
      throw new Error('Invalid YouTube URL');
    }

    const transcript = await YouTubeTranscript.fetchTranscript(videoId);
    if (!transcript || transcript.length === 0) {
      throw new Error('Transcript is disabled or not available for this video');
    }

    return transcript.map(entry => entry.text).join(' ');
  } catch (error) {
    if (error.message.includes('Transcript is disabled')) {
      throw new Error('Transcript is disabled for this video');
    }
    throw new Error(`Failed to extract YouTube transcript: ${error.message}`);
  }
}

// Extract YouTube video ID from URL
function extractYouTubeVideoId(url) {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/([^\/]+)|(?:v|e(?:mbed)?)\/([^\/]+))|youtu\.be\/([^\/]+))/;
  const match = url.match(regex);
  return match ? match[1] || match[2] || match[3] : null;
}

// Extract text from website
async function extractWebText(websiteUrl) {
  try {
    const response = await axios.get(websiteUrl);
    const html = response.data;
    const $ = cheerio.load(html);

    // Remove script and style elements
    $('script, style').remove();

    // Extract text content
    const text = $('body').text();
    return text.trim();
  } catch (error) {
    throw new Error(`Failed to extract web text: ${error.message}`);
  }
}

// Test Connection endpoint
app.get('/api/test-connection', authenticateAPIKey, (req, res) => {
  res.json({ status: 'success', message: 'API is active' });
});

// n8n-optimized endpoint - returns clean { title, content } format
app.post('/api/extract-external', authenticateAPIKey, async (req, res) => {
  const { type, url } = req.body;

  if (!type || !url) {
    return res.status(400).json({ error: 'Missing required fields: type and url' });
  }

  try {
    let title = '';
    let content = '';

    if (type === 'youtube') {
      const transcript = await extractYouTubeTranscript(url);
      title = `YouTube Transcript: ${url}`;
      content = transcript;
    } else if (type === 'web') {
      const text = await extractWebText(url);
      title = `Web Content: ${url}`;
      content = text;
    } else {
      return res.status(400).json({ error: 'Invalid type. Use "youtube" or "web"' });
    }

    res.json({ title, content });
  } catch (error) {
    console.error('Extraction Error:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

// Get API credentials for frontend display
app.get('/api/credentials', (req, res) => {
  const baseUrl = process.env.BASE_URL || `http://localhost:${PORT}`;
  res.json({
    apiKey: API_KEY,
    webhookUrl: `${baseUrl}/api/extract-external`,
    testUrl: `${baseUrl}/api/test-connection`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API Key: ${API_KEY}`);
  console.log(`Endpoint URL: http://localhost:${PORT}/api/extract`);
});