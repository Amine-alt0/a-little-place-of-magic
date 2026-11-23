import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { repository, isSupabaseConfigured } from './supabase.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: '*', // Allows local dev frontend and deployed URL
  methods: ['GET', 'POST', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// 1. Healthcheck & Database status
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    app: 'A Little Place of Magic Backend',
    database: isSupabaseConfigured ? 'Supabase' : 'In-Memory Fallback (Ready for Supabase)',
    timestamp: new Date().toISOString()
  });
});

// 2. Get Comforting Letter
app.get('/api/letter', async (req: Request, res: Response) => {
  try {
    const letter = await repository.getLetter();
    res.json(letter);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to retrieve letter' });
  }
});

// 3. Post Check-in (e.g. "I'm not feeling okay" -> Message or Not ready yet)
app.post('/api/check-ins', async (req: Request, res: Response) => {
  try {
    const { feeling_state, ready_to_talk, message } = req.body;
    const result = await repository.saveCheckIn({
      feeling_state: feeling_state ?? 'not_feeling_okay',
      ready_to_talk: ready_to_talk ?? true,
      message: message ?? ''
    });
    res.status(201).json({
      success: true,
      message: 'Your gentle note has been received with warmth.',
      data: result
    });
  } catch (error: any) {
    console.error('Check-in error:', error);
    res.status(500).json({ error: error.message || 'Failed to save check-in' });
  }
});

// 4. Post Support Request (e.g. "Here's how you can help me")
app.post('/api/support-requests', async (req: Request, res: Response) => {
  try {
    const { choices, specific_request } = req.body;
    const result = await repository.saveSupportRequest({
      choices: Array.isArray(choices) ? choices : [],
      specific_request: specific_request ?? ''
    });
    res.status(201).json({
      success: true,
      message: 'Your choices have been noted with care.',
      data: result
    });
  } catch (error: any) {
    console.error('Support request error:', error);
    res.status(500).json({ error: error.message || 'Failed to save support request' });
  }
});

// 5. Admin / Creator Inbox (To see what was sent by the loved one)
app.get('/api/messages', async (req: Request, res: Response) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  const expectedToken = process.env.ADMIN_ACCESS_TOKEN || 'brother-safe-haven-key';

  if (process.env.NODE_ENV === 'production' && token !== expectedToken) {
    return res.status(401).json({ error: 'Unauthorized access to the quiet inbox' });
  }

  try {
    const messages = await repository.getAllMessages();
    res.json(messages);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to retrieve messages' });
  }
});

// 6. Mark message as read
app.patch('/api/messages/:type/:id/read', async (req: Request, res: Response) => {
  const type = String(req.params.type);
  const id = String(req.params.id);
  if (type !== 'check_in' && type !== 'support_request') {
    return res.status(400).json({ error: 'Invalid type' });
  }

  try {
    const success = await repository.markAsRead(type as 'check_in' | 'support_request', id);
    res.json({ success });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to update read status' });
  }
});

app.listen(PORT, () => {
  console.log(`✨ A Little Place of Magic Backend running on http://localhost:${PORT}`);
  console.log(`✨ Database mode: ${isSupabaseConfigured ? 'Connected to Supabase' : 'In-Memory (Awaiting Supabase credentials in .env)'}`);
});
