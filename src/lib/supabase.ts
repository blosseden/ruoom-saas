import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase credentials are missing. Please check your .env file.',
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

/**
 * Supabase Auth Helpers
 */
export const auth = {
  /**
   * Sign up with email and password
   */
  signUp: async (email: string, password: string, metadata?: object) => {
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });
  },

  /**
   * Sign in with email and password
   */
  signIn: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  },

  /**
   * Sign in with OAuth (Kakao, Naver, Google)
   */
  signInWithOAuth: async (
    provider: 'kakao' | 'google' | 'github' | 'azure',
  ) => {
    return await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  },

  /**
   * Sign out
   */
  signOut: async () => {
    return await supabase.auth.signOut();
  },

  /**
   * Get current session
   */
  getSession: async () => {
    return await supabase.auth.getSession();
  },

  /**
   * Get current user
   */
  getUser: async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  },

  /**
   * Listen to auth state changes
   */
  onAuthStateChange: (callback: (event: string, session: unknown) => void) => {
    return supabase.auth.onAuthStateChange(callback);
  },
};
