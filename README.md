# Movie Watchlist Application

A premium, modern web application that allows users to search, explore details of their favorite movies, and maintain a personalized watchlist. Built using React, TypeScript, Vite, React Query, and Tailwind CSS.

---

## Features

- **Personalized Accounts**: Simple login to maintain isolated watchlists for different user profiles.
- **Search & Pagination**: Find movies instantly using OMDb API search endpoint with debounced queries.
- **Detailed View**: Access full information including plot, cast, ratings, directors, genres, and release details.
- **Watchlist Manager**: Instantly add or remove movies from your watchlist with toast notification alerts.
- **Theme Selection**: Sleek design featuring toggleable Light and Dark modes.
- **Premium UX**: Smooth transitions, custom micro-animations (e.g. logo glow, float effects, text shimmer), and fully responsive layout.

---

## Setup Instructions

Follow these steps to run the application locally on your machine.

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (recommended version 18.x or above) along with `npm` (usually bundled with Node.js).

### Step 1: Clone or Open Project

Open your terminal and navigate to the project root directory:

```bash
cd movie-watchlist-app
```

### Step 2: Install Dependencies

Install the required packages using `npm`:

```bash
npm install
```

### Step 3: OMDb API Key Setup

This application interacts with the Open Movie Database (OMDb) API to retrieve movie information.

1. **Obtain an API Key**: Go to [OMDb API](http://www.omdbapi.com/apikey.aspx) and request a free or paid API key.
2. **Create Environment File**: In the root of your project directory, create a new file named `.env`:
   ```bash
   touch .env
   ```
3. **Configure Environment Variables**: Add the following lines to your `.env` file, replacing `YOUR_OMDB_API_KEY_HERE` with the key you obtained:
   ```env
   VITE_OMDB_API_KEY=YOUR_OMDB_API_KEY_HERE
   VITE_OMDB_BASE_URL=https://www.omdbapi.com/
   ```

> [!WARNING]
> **Security Reminder**: Do not commit your `.env` file or OMDb API keys to source control. The `.env` file is already listed in the project's `.gitignore` to prevent accidental commits.

### Step 4: Run Development Server

Start the Vite development server:

```bash
npm run dev
```

The server should now be running locally. Open your browser and navigate to the local address displayed in the terminal console (e.g. `http://localhost:5173`).

