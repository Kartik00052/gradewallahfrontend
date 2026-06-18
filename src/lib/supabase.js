import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const missingEnv = !supabaseUrl || !supabaseAnonKey;

if (missingEnv) {
  console.warn(
    '[Supabase] VITE_SUPABASE_URL and/or VITE_SUPABASE_ANON_KEY not set. ' +
    'Auth will use demo mode. Create a .env file with these values to enable real auth.'
  );
}

const createDemoClient = () => {
  const noop = () => Promise.resolve({ data: null, error: null });
  return {
    auth: {
      getSession: noop,
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signUp: noop,
      signInWithPassword: noop,
      signInWithOAuth: noop,
      signOut: noop,
    },
  };
};

export const supabase = missingEnv ? createDemoClient() : createClient(supabaseUrl, supabaseAnonKey);
