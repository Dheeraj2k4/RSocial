import { isSupabaseConfigured, supabase } from '@/lib/supabase';

export type ProfileInput = {
  id: string;
  username?: string;
  displayName?: string;
  avatarUrl?: string;
};

/**
 * Creates the Supabase profile row for a freshly authenticated Clerk user.
 * Idempotent: never overwrites an existing profile. No-ops until Supabase is configured.
 */
export async function ensureProfile(input: ProfileInput): Promise<void> {
  if (!isSupabaseConfigured) return;

  const { data: existing } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', input.id)
    .maybeSingle();

  if (existing) return;

  const username = input.username?.trim() || `foodie_${input.id.slice(-6).toLowerCase()}`;

  await supabase.from('profiles').insert({
    id: input.id,
    username,
    display_name: input.displayName ?? null,
    avatar_url: input.avatarUrl ?? null,
  });
}
