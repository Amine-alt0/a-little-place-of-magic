-- ==============================================================================
-- A Little Place of Magic - Supabase Schema
-- ==============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Check-ins Table
CREATE TABLE IF NOT EXISTS public.check_ins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    feeling_state TEXT DEFAULT 'not_feeling_okay' NOT NULL,
    ready_to_talk BOOLEAN DEFAULT TRUE NOT NULL,
    message TEXT,
    is_read BOOLEAN DEFAULT FALSE NOT NULL
);

-- 2. Support Requests Table
CREATE TABLE IF NOT EXISTS public.support_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    choices TEXT[] DEFAULT '{}'::TEXT[] NOT NULL,
    specific_request TEXT,
    is_read BOOLEAN DEFAULT FALSE NOT NULL
);

-- 3. Letters Table (Configurable comforting letter)
CREATE TABLE IF NOT EXISTS public.letters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT DEFAULT 'A little letter for you.' NOT NULL,
    salutation TEXT DEFAULT 'To you,' NOT NULL,
    paragraphs TEXT[] NOT NULL,
    signoff TEXT DEFAULT 'With care, your brother.' NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL
);

-- Seed initial letter from design
INSERT INTO public.letters (title, salutation, paragraphs, signoff, is_active)
VALUES (
    'A little letter for you.',
    'To you,',
    ARRAY[
        'I don''t always know the right words or the perfect thing to do, but I want you to know that I genuinely care about you.',
        'I made this little space because I want you to know that you don''t have to pretend everything is okay around me.',
        'I want to be there for you, not to pressure you into talking, but simply to support you whenever you need it.',
        'Think of me as a brother who''s always willing to listen, help, or simply be around when things get difficult.',
        'You don''t owe me an explanation. Just know that you matter, and I''m here.'
    ],
    'With care, your brother.',
    TRUE
)
ON CONFLICT DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE public.check_ins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.letters ENABLE ROW LEVEL SECURITY;

-- Anonymous users (your loved one visiting the web app) can insert their notes
CREATE POLICY "Allow anonymous insert on check_ins" 
    ON public.check_ins FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Allow anonymous insert on support_requests" 
    ON public.support_requests FOR INSERT 
    WITH CHECK (true);

-- Anyone can read the active comforting letter
CREATE POLICY "Allow public read on active letters" 
    ON public.letters FOR SELECT 
    USING (is_active = true);

-- Service role / authenticated admin can read all check_ins and support_requests
CREATE POLICY "Allow service role full access on check_ins" 
    ON public.check_ins FOR ALL 
    USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');

CREATE POLICY "Allow service role full access on support_requests" 
    ON public.support_requests FOR ALL 
    USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');
