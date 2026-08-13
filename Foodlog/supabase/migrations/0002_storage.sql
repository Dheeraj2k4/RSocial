-- ============================================================================
-- Foodlog — 0002 storage buckets + policies
-- Files are namespaced by Clerk user id: {user_id}/...  so users can only
-- write inside their own folder. Public read for image display.
-- ============================================================================

insert into storage.buckets (id, name, public)
values
  ('avatars', 'avatars', true),
  ('review-photos', 'review-photos', true),
  ('list-covers', 'list-covers', true)
on conflict (id) do nothing;

-- Public read across app image buckets.
create policy storage_read_public on storage.objects
  for select
  using (bucket_id in ('avatars', 'review-photos', 'list-covers'));

-- Write only inside your own {user_id}/ prefix.
create policy storage_insert_own on storage.objects
  for insert
  with check (
    bucket_id in ('avatars', 'review-photos', 'list-covers')
    and (storage.foldername(name))[1] = public.uid()
  );

create policy storage_update_own on storage.objects
  for update
  using (
    bucket_id in ('avatars', 'review-photos', 'list-covers')
    and (storage.foldername(name))[1] = public.uid()
  )
  with check (
    bucket_id in ('avatars', 'review-photos', 'list-covers')
    and (storage.foldername(name))[1] = public.uid()
  );

create policy storage_delete_own on storage.objects
  for delete
  using (
    bucket_id in ('avatars', 'review-photos', 'list-covers')
    and (storage.foldername(name))[1] = public.uid()
  );
