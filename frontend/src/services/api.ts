import { CheckInPayload, SupportPayload, LetterData, CheckInRecord, SupportRecord } from '../types';
import { createClient } from '@supabase/supabase-js';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const directSupabase = (SUPABASE_URL && SUPABASE_ANON_KEY)
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// Fallback letter if backend and Supabase are unreachable
export const DEFAULT_LETTER: LetterData = {
  title: 'A little letter for you.',
  salutation: 'To you,',
  paragraphs: [
    "I don't always know the right words or the perfect thing to do, but I want you to know that I genuinely care about you.",
    "I made this little space because I want you to know that you don't have to pretend everything is okay around me.",
    "I want to be there for you, not to pressure you into talking, but simply to support you whenever you need it.",
    "Think of me as a brother who's always willing to listen, help, or simply be around when things get difficult.",
    "You don't owe me an explanation. Just know that you matter, and I'm here."
  ],
  signoff: 'With care, your brother.'
};

export const api = {
  async sendCheckIn(payload: CheckInPayload): Promise<boolean> {
    // 1. Try backend API
    try {
      const res = await fetch(`${API_BASE_URL}/check-ins`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) return true;
    } catch {
      // Backend not running, proceed to direct Supabase
    }

    // 2. Try direct Supabase
    if (directSupabase) {
      try {
        const { error } = await directSupabase.from('check_ins').insert([{
          feeling_state: payload.feeling_state || 'not_feeling_okay',
          ready_to_talk: payload.ready_to_talk ?? true,
          message: payload.message || ''
        }]);
        if (!error) return true;
        console.error('Direct Supabase insert error:', error);
      } catch (e) {
        console.warn('Direct Supabase call failed:', e);
      }
    }

    // 3. Fallback localStorage
    const existing = JSON.parse(localStorage.getItem('local_check_ins') || '[]');
    existing.unshift({
      id: 'local-' + Date.now(),
      created_at: new Date().toISOString(),
      ...payload,
      is_read: false
    });
    localStorage.setItem('local_check_ins', JSON.stringify(existing));
    return true;
  },

  async sendSupportRequest(payload: SupportPayload): Promise<boolean> {
    // 1. Try backend API
    try {
      const res = await fetch(`${API_BASE_URL}/support-requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) return true;
    } catch {
      // Backend not running, proceed to direct Supabase
    }

    // 2. Try direct Supabase
    if (directSupabase) {
      try {
        const { error } = await directSupabase.from('support_requests').insert([{
          choices: payload.choices || [],
          specific_request: payload.specific_request || ''
        }]);
        if (!error) return true;
        console.error('Direct Supabase insert error:', error);
      } catch (e) {
        console.warn('Direct Supabase call failed:', e);
      }
    }

    // 3. Fallback localStorage
    const existing = JSON.parse(localStorage.getItem('local_support_requests') || '[]');
    existing.unshift({
      id: 'local-' + Date.now(),
      created_at: new Date().toISOString(),
      ...payload,
      is_read: false
    });
    localStorage.setItem('local_support_requests', JSON.stringify(existing));
    return true;
  },

  async fetchLetter(): Promise<LetterData> {
    try {
      const res = await fetch(`${API_BASE_URL}/letter`);
      if (res.ok) return await res.json();
    } catch {
      // Backend not reachable
    }

    if (directSupabase) {
      try {
        const { data, error } = await directSupabase
          .from('letters')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();
        if (!error && data) return data as LetterData;
      } catch {}
    }

    return DEFAULT_LETTER;
  },

  async fetchInbox(): Promise<{ checkIns: CheckInRecord[]; supportRequests: SupportRecord[] }> {
    // 1. Try backend API first
    try {
      const res = await fetch(`${API_BASE_URL}/messages`, {
        headers: {
          'Authorization': 'Bearer brother-safe-haven-key'
        }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.checkIns?.length > 0 || data.supportRequests?.length > 0) {
          return data;
        }
      }
    } catch {}

    // 2. Query direct Supabase
    if (directSupabase) {
      try {
        const [{ data: cData }, { data: sData }] = await Promise.all([
          directSupabase.from('check_ins').select('*').order('created_at', { ascending: false }),
          directSupabase.from('support_requests').select('*').order('created_at', { ascending: false })
        ]);
        if (cData || sData) {
          return {
            checkIns: (cData as CheckInRecord[]) || [],
            supportRequests: (sData as SupportRecord[]) || []
          };
        }
      } catch (err) {
        console.warn('Direct Supabase query error:', err);
      }
    }

    // 3. Fallback to localStorage
    return {
      checkIns: JSON.parse(localStorage.getItem('local_check_ins') || '[]'),
      supportRequests: JSON.parse(localStorage.getItem('local_support_requests') || '[]')
    };
  },

  async markAsRead(type: 'check_in' | 'support_request', id: string): Promise<void> {
    try {
      await fetch(`${API_BASE_URL}/messages/${type}/${id}/read`, {
        method: 'PATCH'
      });
    } catch {}

    if (directSupabase) {
      try {
        const table = type === 'check_in' ? 'check_ins' : 'support_requests';
        await directSupabase.from(table).update({ is_read: true }).eq('id', id);
      } catch {}
    }

    const key = type === 'check_in' ? 'local_check_ins' : 'local_support_requests';
    const items = JSON.parse(localStorage.getItem(key) || '[]');
    const found = items.find((x: any) => x.id === id);
    if (found) found.is_read = true;
    localStorage.setItem(key, JSON.stringify(items));
  }
};
