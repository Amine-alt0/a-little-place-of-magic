export interface CheckIn {
  id: string;
  created_at: string;
  feeling_state: string;
  ready_to_talk: boolean;
  message?: string;
  is_read: boolean;
}

export interface SupportRequest {
  id: string;
  created_at: string;
  choices: string[];
  specific_request?: string;
  is_read: boolean;
}

export interface Letter {
  id: string;
  created_at: string;
  title: string;
  salutation: string;
  paragraphs: string[];
  signoff: string;
  is_active: boolean;
}
