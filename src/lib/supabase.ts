import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://azyjwwoagqbdkqitthtt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6eWp3d29hZ3FiZGtxaXR0aHR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5MTE3OTUsImV4cCI6MjA3NjQ4Nzc5NX0.3s_FDJ-SxsIZdJlBgvbblpsUU6p-cdV1Oja4fDVZfnY';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Create a wrapper to maintain compatibility with existing base44 interface
export const base44 = {
  auth: {
    me: async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      
      // Get user settings from the profiles table
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('wellness_theme, is_dark_mode')
        .eq('id', user?.id)
        .single();
      
      if (profileError) throw profileError;
      
      return {
        wellness_theme: profile?.wellness_theme,
        is_dark_mode: profile?.is_dark_mode
      };
    },
    updateMe: async (data: { wellness_theme?: string; is_dark_mode?: boolean }) => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      const { data: profile, error } = await supabase
        .from('profiles')
        .update({
          wellness_theme: data.wellness_theme,
          is_dark_mode: data.is_dark_mode,
          updated_at: new Date().toISOString()
        })
        .eq('id', user?.id)
        .select()
        .single();

      if (error) throw error;
      return profile;
    }
  }
};