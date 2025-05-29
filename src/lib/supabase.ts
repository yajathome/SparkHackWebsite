import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type User = {
  id: string;
  username: string;
  role: 'user' | 'admin';
};

export type Project = {
  id: string;
  title: string;
  description: string;
  screenshot_url: string;
  github_url: string;
  youtube_url: string;
  demo_url?: string;
  created_at: string;
  user_id: string;
  user_username?: string;
};