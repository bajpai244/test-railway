# Add Numbers App

A simple full-stack application with a Svelte frontend and Node.js backend that adds two numbers.

## Project Structure

```
├── server/          # Node.js backend
│   ├── index.js     # Express server with /api/add endpoint
│   └── package.json
├── frontend/        # Svelte frontend
│   ├── src/
│   │   ├── lib/AddNumbers.svelte  # Main component
│   │   ├── App.svelte
│   │   └── main.js
│   ├── .env         # API URL configuration
│   └── package.json
└── README.md
```

## Quick Start

### 1. Install Dependencies

```bash
# Install server dependencies
cd server && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### 2. Start the Server

```bash
cd server
npm start
# or for development with auto-reload:
npm run dev
```

Server runs on http://localhost:3000

### 3. Start the Frontend

```bash
cd frontend
npm run dev
```

Frontend runs on http://localhost:5173

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/api/add` | POST | Add two numbers (JSON body: `{a, b}`) |
| `/api/add?a=1&b=2` | GET | Add two numbers via query params |

## Frontend Configuration

The frontend uses a `.env` file for configuration:

```bash
# frontend/.env
VITE_API_URL=http://localhost:3000
```

You can change this to point to any API endpoint:
- Local development: `http://localhost:3000`
- Production: `https://your-api-domain.com`

> **Note:** In Vite, environment variables must be prefixed with `VITE_` to be exposed to the client-side code.

## Usage

1. Open http://localhost:5173 in your browser
2. Enter two numbers in the input fields
3. Click "Add" or press Enter
4. See the result displayed below

The UI also displays the current API endpoint it's connecting to.

## Environment Variables

### Server
- `PORT` - Server port (default: 3000)

### Frontend
- `VITE_API_URL` - Backend API URL (default: http://localhost:3000)
