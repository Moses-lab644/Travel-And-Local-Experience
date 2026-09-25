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
## Environment variables

Environment variables are settings supplied outside the source code (such as the port or environment mode), so they can differ between machines without changing the code.

- `.env.example` is committed to the repo and lists every variable the app needs, with placeholder values only.
- `.env` holds your real local values. It is excluded by `.gitignore` and must never be committed.

Setup:

cp .env.example .env