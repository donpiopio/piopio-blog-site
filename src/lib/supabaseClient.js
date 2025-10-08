import { createClient } from '@supabase/supabase-js';

const url = process.env.REACT_APP_SUPABASE_URL;
const anon = process.env.REACT_APP_SUPABASE_ANON_KEY;

let supabase = null;
if (url && anon) {
  try {
    supabase = createClient(url, anon, {
      auth: {
        persistSession: false,
      },
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Supabase init failed:', e);
  }
}

export function getSupabase() {
  return supabase;
}

export function isSupabaseConfigured() {
  return !!supabase;
}
