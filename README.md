# ✨ A Little Place of Magic

> *"Hey, you. Sometimes, words are hard. That's okay. I made this little place for you. Whenever things don't feel right, you can come here. You don't have to explain anything unless you want to."*

A gentle, thoughtful web application designed as an emotional sanctuary for someone you love. It allows them to reach out without pressure, choose the exact kind of support they need, read a warm personal letter, or simply know that you are there at their own pace.

---

## 🌟 Features & Design Fidelity

- **Pixel-Perfect Figma Translation:**
  - Magical night atmosphere with deep `#171b35` background
  - Warm candlelight wash and dual ivory candles with organic flickering flame animations
  - 16 floating spell light particles with 8-second gentle floating cycles
  - Reusable parchment cards (`#f1e6d0` with `#c5a66a` gold border and `#642f43` plum accents)
  - Typography: **Caveat** (handwritten tenderness), **Cormorant Garamond** (warm serif elegance), and **DM Sans** (clean readability)
  - "Pause motion" control for sensory/motion accessibility
  - Fully responsive across Desktop, Tablet, and Mobile

- **Interactive User Experience:**
  1. **Home Experience:** Welcome greeting, two gentle choices, and personal letter invitation
  2. **A Gentle Check-in:** Ask without pressure — choose between talking about it or taking their time
  3. **I'm Listening:** Freeform heartfelt message area with focus highlight and no required fields
  4. **Your Pace:** Reassuring screen affirming that needing space is completely okay
  5. **How I Can Help:** 7 multi-select support choices + optional specific requests
  6. **Sending & Reassurance:** Calming progress feedback followed by warm confirmation
  7. **Your Letter:** Animated unfolding envelope with wax seal that reveals a heartfelt personal letter
  8. **The Quiet Inbox (`💌`):** A private sanctuary view for the creator/brother to view all received notes and requests

---

## 📁 Project Architecture

```
a-little-place-of-magic/
├── frontend/                     # React + Vite + TypeScript + Tailwind CSS
│   ├── public/assets/            # All 29 SVG assets downloaded from Figma
│   ├── src/
│   │   ├── components/           # Atmosphere, Header, Footer, Screens, ParchmentCard
│   │   ├── services/api.ts       # Backend & Supabase client integration layer
│   │   ├── types.ts              # TypeScript interface definitions
│   │   ├── App.tsx               # Screen orchestration & state
│   │   └── index.css             # Tailwind & Figma keyframe animations
│   └── package.json
│
├── backend/                      # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── server.ts             # REST API endpoints & logging
│   │   ├── supabase.ts           # Supabase repository with automatic in-memory fallback
│   │   └── types.ts              # Data contracts
│   ├── .env.example              # Environment variables template
│   └── package.json
│
└── supabase/                     # Supabase database setup
    ├── schema.sql                # Tables, seed letter, and RLS policies
    └── README.md                 # Step-by-step setup guide
```

---

## 🚀 Quick Start (Run Locally)

### 1. Start the Backend API

```powershell
cd backend
npm install
npm run dev
```

The backend starts on `http://localhost:4000`.
*Note: Works immediately out-of-the-box using the built-in in-memory repository if Supabase credentials are not yet added!*

### 2. Start the Frontend App

```powershell
cd ../frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 🗄️ Adding Supabase Database

When you are ready to connect Supabase:

1. **Create a project** at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Copy the contents of `supabase/schema.sql` and click **Run**. This will create:
   - `check_ins` table (for freeform notes & pace check-ins)
   - `support_requests` table (for multi-select support requests)
   - `letters` table (seeded with the comforting letter from the Figma design)
   - Row Level Security (RLS) policies allowing anonymous visitor inserts and protected reads.
4. Copy your Supabase Project URL and Service Role Key (or Anon Key) from **Project Settings > API**.
5. Create a `.env` file in `backend/`:
   ```env
   PORT=4000
   FRONTEND_URL=http://localhost:5173
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
   ADMIN_ACCESS_TOKEN=brother-safe-haven-key
   ```
6. Restart the backend: `npm run dev`. The backend will automatically detect Supabase and persist all notes directly into your database!

---

## 🌐 Deployment Guide

### Deploy Frontend (Vercel or Netlify)
1. Push this repository to GitHub.
2. In Vercel or Netlify, import the repository and set:
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Environment Variable:** `VITE_API_URL=https://your-backend-url.onrender.com/api`

### Deploy Backend (Render, Railway, or Fly.io)
1. In Render / Railway, create a new Web Service and set:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - Add the environment variables (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_ACCESS_TOKEN`).
