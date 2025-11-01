import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string | null;
          display_name: string | null;
          full_name: string | null;
          avatar_url: string | null;
          anonymized: boolean;
          wellness_theme: string | null;
          is_dark_mode: boolean;
          is_first_time: boolean;
          days_active: number;
          reflections_count: number;
          support_given: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username?: string | null;
          display_name?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          anonymized?: boolean;
          wellness_theme?: string | null;
          is_dark_mode?: boolean;
          is_first_time?: boolean;
          days_active?: number;
          reflections_count?: number;
          support_given?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string | null;
          display_name?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          anonymized?: boolean;
          wellness_theme?: string | null;
          is_dark_mode?: boolean;
          is_first_time?: boolean;
          days_active?: number;
          reflections_count?: number;
          support_given?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      reflections: {
        Row: {
          id: string;
          user_id: string;
          emotion: string;
          intensity: number;
          title: string | null;
          body: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          emotion: string;
          intensity: number;
          title?: string | null;
          body: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          emotion?: string;
          intensity?: number;
          title?: string | null;
          body?: string;
          created_at?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          user_id: string;
          category: string;
          content: string;
          reactions: Record<string, number>;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          category: string;
          content: string;
          reactions?: Record<string, number>;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          category?: string;
          content?: string;
          reactions?: Record<string, number>;
          created_at?: string;
        };
      };
    };
  };
};