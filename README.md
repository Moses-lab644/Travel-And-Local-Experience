# Wayfarinook API

Node.js and TypeScript REST API for the Wayfarinook travel platform.

## Requirements

- Node.js
- npm

## Development

Install dependencies:

npm install

Start the development server:

npm run dev

The API listens on port 3000 by default.

## Production

Build the TypeScript source:

npm run build

Start the compiled application:

npm start

## Health Check

When the server is running:

GET /health

Expected response:

{
  "status": "ok"
}