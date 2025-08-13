import { createClient } from '@supabase/supabase-js';

/**
 * Supabase client singleton configured via environment variables.
 * Requires:
 * - REACT_APP_SUPABASE_URL
 * - REACT_APP_SUPABASE_KEY
 */
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  // eslint-disable-next-line no-console
  console.warn(
    'Supabase credentials are not set. Please provide REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_KEY in your environment.'
  );
}

const supabase = createClient(supabaseUrl || '', supabaseKey || '');

// PUBLIC_INTERFACE
export function getSupabase() {
  /** Returns the Supabase client instance. */
  return supabase;
}
