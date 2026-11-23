# Supabase Database Guide

This directory contains the database schema for **A Little Place of Magic**.

## Tables

### 1. `check_ins`
Stores messages from the "I'm not feeling okay" flow:
- `id` (UUID, primary key)
- `created_at` (TIMESTAMPTZ)
- `feeling_state` (TEXT, default: 'not_feeling_okay')
- `ready_to_talk` (BOOLEAN, true if wrote a message, false if chose "Your pace")
- `message` (TEXT, user's thoughts)
- `is_read` (BOOLEAN, read status)

### 2. `support_requests`
Stores responses from the "Here's how you can help me" flow:
- `id` (UUID, primary key)
- `created_at` (TIMESTAMPTZ)
- `choices` (TEXT[], e.g., ["I just need someone to listen", "I'd like some company"])
- `specific_request` (TEXT, optional custom note)
- `is_read` (BOOLEAN)

### 3. `letters`
Stores the active letter displayed in the envelope:
- `id` (UUID, primary key)
- `title` (TEXT, default: 'A little letter for you.')
- `salutation` (TEXT, default: 'To you,')
- `paragraphs` (TEXT[], letter body paragraphs)
- `signoff` (TEXT, default: 'With care, your brother.')
- `is_active` (BOOLEAN)

## How to Apply

1. Log into your Supabase Dashboard at https://app.supabase.com.
2. Select your project (or create a new one).
3. Navigate to **SQL Editor** in the left sidebar.
4. Click **New Query**, paste the full contents of `schema.sql`, and press **Run**.
5. All tables, seed letter, and Row Level Security policies will be immediately created!
