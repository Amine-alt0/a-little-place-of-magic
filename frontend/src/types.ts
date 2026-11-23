export type ScreenType =
  | 'home'
  | 'check-in'
  | 'listening'
  | 'your-pace'
  | 'how-i-can-help'
  | 'sending'
  | 'reassurance'
  | 'your-letter'
  | 'inbox';

export interface CheckInPayload {
  feeling_state?: string;
  ready_to_talk?: boolean;
  message?: string;
}

export interface SupportPayload {
  choices: string[];
  specific_request?: string;
}

export interface LetterData {
  id?: string;
  title: string;
  salutation: string;
  paragraphs: string[];
  signoff: string;
}

export interface CheckInRecord {
  id: string;
  created_at: string;
  feeling_state: string;
  ready_to_talk: boolean;
  message?: string;
  is_read: boolean;
}

export interface SupportRecord {
  id: string;
  created_at: string;
  choices: string[];
  specific_request?: string;
  is_read: boolean;
}
