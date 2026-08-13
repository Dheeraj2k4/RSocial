import 'react-native-url-polyfill/auto';

import { createClient } from '@supabase/supabase-js';

import { ENV } from '@/config/env';

/** True once the Supabase project env vars are provided. */
export const isSupabaseConfigured = Boolean(ENV.supabaseUrl && ENV.supabaseAnonKey);

// Clerk owns the session; we hand its JWT to Supabase so RLS can read auth.jwt()->>'sub'.
let tokenGetter: (() => Promise<string | null>) | null = null;

export function setSupabaseTokenGetter(getter: () => Promise<string | null>): void {
  tokenGetter = getter;
}

export const supabase = createClient(
  ENV.supabaseUrl || 'https://placeholder.supabase.co',
  ENV.supabaseAnonKey || 'public-anon-placeholder',
  {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    accessToken: async () => (tokenGetter ? await tokenGetter() : null),
    global: { headers: { 'x-client-info': 'foodlog-mobile' } },
  },
);
