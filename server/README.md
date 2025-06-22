# Magicroll Backend

## Setup & Run

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server (development):
   ```bash
   npm run dev
   ```
   Or for production:
   ```bash
   npm start
   ```

Server runs on `http://localhost:5000`

## Endpoints

- `POST /api/signup` — User signup
- `POST /api/login` — User login (returns JWT)
- `POST /api/activity` — Store activity data (JWT required)
- `GET /api/activity/:date` — Get activity data for a date (JWT required)
- `POST /api/chat` — Query chat (JWT required, mock reply)

## ScreenPipe SDK

Integrate the ScreenPipe SDK in `index.js` where indicated to capture and process screen activity. 