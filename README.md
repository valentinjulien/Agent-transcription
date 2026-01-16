# Content Extraction Tool

A fullstack application for extracting content from YouTube videos and websites, designed for seamless n8n integration.

## Features

- Extract transcripts from YouTube videos
- Extract text content from any website
- RESTful API with API key authentication
- Modern React frontend with Tailwind CSS
- Developer settings panel with API credentials
- CORS-enabled for external integrations
- n8n-optimized webhook endpoint

## Project Structure

```
agent-transcription/
├── server.js              # Express backend
├── package.json           # Backend dependencies
├── .env                   # Environment variables (create from .env.example)
├── .env.example          # Environment variables template
└── client/               # React frontend
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── ExtractionForm.js
    │   │   ├── ResultsDisplay.js
    │   │   └── DeveloperSettings.js
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    ├── package.json
    ├── tailwind.config.js
    └── postcss.config.js
```

## Setup Instructions

### 1. Environment Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and set your values:

```
PORT=3000
API_KEY=your_secure_api_key_here
BASE_URL=http://localhost:3000
```

### 2. Install Dependencies

Backend:
```bash
npm install
```

Frontend:
```bash
cd client
npm install
```

### 3. Run the Application

Backend (from root directory):
```bash
npm start
```

Frontend (from client directory):
```bash
cd client
npm start
```

The backend will run on `http://localhost:3000` and the frontend on `http://localhost:3001`.

## API Endpoints

### 1. Extract Content (Original Endpoint)

```
POST /api/extract
```

Headers:
```json
{
  "Content-Type": "application/json",
  "x-api-key": "YOUR_API_KEY"
}
```

Body:
```json
{
  "type": "youtube",
  "url": "https://www.youtube.com/watch?v=VIDEO_ID"
}
```

Response:
```json
{
  "type": "youtube",
  "url": "https://www.youtube.com/watch?v=VIDEO_ID",
  "transcript": "Full transcript text..."
}
```

### 2. Extract Content for n8n (Optimized Endpoint)

```
POST /api/extract-external
```

This endpoint returns a clean format optimized for n8n workflows.

Headers:
```json
{
  "Content-Type": "application/json",
  "x-api-key": "YOUR_API_KEY"
}
```

Body:
```json
{
  "type": "youtube",
  "url": "https://www.youtube.com/watch?v=VIDEO_ID"
}
```

Response:
```json
{
  "title": "YouTube Transcript: https://www.youtube.com/watch?v=VIDEO_ID",
  "content": "Full transcript text..."
}
```

### 3. Test Connection

```
GET /api/test-connection
```

Headers:
```json
{
  "x-api-key": "YOUR_API_KEY"
}
```

Response:
```json
{
  "status": "success",
  "message": "API is active"
}
```

### 4. Get API Credentials

```
GET /api/credentials
```

Response:
```json
{
  "apiKey": "YOUR_API_KEY",
  "webhookUrl": "http://localhost:3000/api/extract-external",
  "testUrl": "http://localhost:3000/api/test-connection"
}
```

## n8n Integration

### HTTP Request Node Configuration

1. Add an HTTP Request node in n8n
2. Configure as follows:

**Method:** POST

**URL:** `http://localhost:3000/api/extract-external`

**Authentication:** None (using header)

**Headers:**
- Name: `Content-Type`, Value: `application/json`
- Name: `x-api-key`, Value: `YOUR_API_KEY`

**Body:** JSON

```json
{
  "type": "youtube",
  "url": "{{$json["url"]}}"
}
```

### Response Handling

The endpoint returns:
```json
{
  "title": "Content title",
  "content": "Extracted content"
}
```

Access the data in subsequent nodes:
- `{{$json["title"]}}` - The content title
- `{{$json["content"]}}` - The extracted content

## Supported Content Types

- `youtube` - Extract transcripts from YouTube videos
- `web` - Extract text content from websites

## Frontend Features

### Extract Content Tab
- Select content type (YouTube or Website)
- Enter URL to extract
- View extracted content with statistics
- Copy content to clipboard

### Developer Settings Tab
- View API key
- Copy webhook URL for n8n
- View integration examples
- See supported content types

## Deployment

### Backend Deployment (Vercel/Heroku)

1. Set environment variables in your hosting platform
2. Deploy the root directory
3. Update `BASE_URL` in `.env` to your production URL

### Frontend Deployment (Netlify/Vercel)

1. Build the frontend:
```bash
cd client
npm run build
```

2. Deploy the `client/build` directory

3. Update API URLs in the frontend code to point to your production backend

## Security Notes

- Keep your API key secure
- Never commit `.env` files to version control
- Use HTTPS in production
- Rotate API keys regularly
- Implement rate limiting for production use

## Tech Stack

**Backend:**
- Node.js
- Express
- axios
- cheerio
- youtube-transcript
- cors
- dotenv

**Frontend:**
- React 18
- Tailwind CSS
- React Scripts

## License

ISC

## Author

Valentin
