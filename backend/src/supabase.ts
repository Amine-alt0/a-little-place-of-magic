import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { CheckIn, SupportRequest, Letter } from './types.js';
import { randomUUID } from 'crypto';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseKey!)
  : null;

// In-Memory Storage for dev & before Supabase connection is plugged in
const memoryDb = {
  checkIns: [] as CheckIn[],
  supportRequests: [] as SupportRequest[],
  letter: {
    id: 'default-letter-1',
    created_at: new Date().toISOString(),
    title: 'A little letter for you.',
    salutation: 'To you,',
    paragraphs: [
      "I don't always know the right words or the perfect thing to do, but I want you to know that I genuinely care about you.",
      "I made this little space because I want you to know that you don't have to pretend everything is okay around me.",
      "I want to be there for you, not to pressure you into talking, but simply to support you whenever you need it.",
      "Think of me as a brother who's always willing to listen, help, or simply be around when things get difficult.",
      "You don't owe me an explanation. Just know that you matter, and I'm here."
    ],
    signoff: 'With care, your brother.',
    is_active: true
  } as Letter
};

export const repository = {
  async saveCheckIn(data: { feeling_state?: string; ready_to_talk?: boolean; message?: string }): Promise<CheckIn> {
    const entry: CheckIn = {
      id: randomUUID(),
      created_at: new Date().toISOString(),
      feeling_state: data.feeling_state || 'not_feeling_okay',
      ready_to_talk: data.ready_to_talk !== undefined ? data.ready_to_talk : true,
      message: data.message || '',
      is_read: false
    };

    if (supabase) {
      const { error } = await supabase
        .from('check_ins')
        .insert([entry]);
      if (error) {
        console.error('Supabase error inserting check-in:', error.message);
        throw error;
      }
      return entry;
    }

    memoryDb.checkIns.unshift(entry);
    console.log('[InMemory] Saved check-in:', entry.id);
    return entry;
  },

  async saveSupportRequest(data: { choices: string[]; specific_request?: string }): Promise<SupportRequest> {
    const entry: SupportRequest = {
      id: randomUUID(),
      created_at: new Date().toISOString(),
      choices: data.choices || [],
      specific_request: data.specific_request || '',
      is_read: false
    };

    if (supabase) {
      const { error } = await supabase
        .from('support_requests')
        .insert([entry]);
      if (error) {
        console.error('Supabase error inserting support request:', error.message);
        throw error;
      }
      return entry;
    }

    memoryDb.supportRequests.unshift(entry);
    console.log('[InMemory] Saved support request:', entry.id);
    return entry;
  },

  async getLetter(): Promise<Letter> {
    if (supabase) {
      const { data, error } = await supabase
        .from('letters')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      if (!error && data) {
        return data as Letter;
      }
    }
    return memoryDb.letter;
  },

  async getAllMessages(): Promise<{ checkIns: CheckIn[]; supportRequests: SupportRequest[] }> {
    if (supabase) {
      const [{ data: cData }, { data: sData }] = await Promise.all([
        supabase.from('check_ins').select('*').order('created_at', { ascending: false }),
        supabase.from('support_requests').select('*').order('created_at', { ascending: false })
      ]);
      return {
        checkIns: (cData as CheckIn[]) || [],
        supportRequests: (sData as SupportRequest[]) || []
      };
    }

    return {
      checkIns: memoryDb.checkIns,
      supportRequests: memoryDb.supportRequests
    };
  },

  async markAsRead(type: 'check_in' | 'support_request', id: string): Promise<boolean> {
    if (supabase) {
      const table = type === 'check_in' ? 'check_ins' : 'support_requests';
      const { error } = await supabase.from(table).update({ is_read: true }).eq('id', id);
      return !error;
    }

    if (type === 'check_in') {
      const item = memoryDb.checkIns.find(x => x.id === id);
      if (item) item.is_read = true;
    } else {
      const item = memoryDb.supportRequests.find(x => x.id === id);
      if (item) item.is_read = true;
    }
    return true;
  }
};
