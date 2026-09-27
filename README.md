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

## Discovery data verification

In-memory place and activity data is loaded from `fixtures/discovery-records.json` at process startup (not persisted between restarts).

To verify the lookups work:


This checks a known place, a known activity, and a deliberately unavailable activity ID, confirming the found/not-found lookup behavior.
## Discovery endpoint

`GET /places/:id` — returns a single place by ID.

- `200 OK` with the place data if found.
- `400 Bad Request` if `id` is missing or contains characters other than letters, numbers, and hyphens.
- `404 Not Found` if `id` is validly formatted but no place matches it.

Examples:

curl http://localhost:3000/places/place-demo-001
curl http://localhost:3000/places/place-demo-999
curl "http://localhost:3000/places/invalid@id!"

The third example returns 400 with:

{"status":"error","message":"id must contain only letters, numbers, and hyphens"}
