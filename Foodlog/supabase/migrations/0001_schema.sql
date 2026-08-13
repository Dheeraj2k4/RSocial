-- ============================================================================
-- Foodlog — 0001 schema, indexes, aggregation triggers, and RLS
-- Auth model: Clerk (third-party auth). User IDs are TEXT = Clerk `sub`.
-- RLS identifies the caller via auth.jwt() ->> 'sub' (wrapped as public.uid()).
-- ============================================================================

create extension if not exists "pgcrypto";

-- Current Clerk user id from the verified JWT, or null for anon.
create or replace function public.uid()
returns text
language sql
stable
as $$
  select nullif(auth.jwt() ->> 'sub', '')::text;
$$;

-- Generic updated_at touch.
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists public.profiles (
  id           text primary key,                 -- Clerk user id (e.g. user_2ab...)
  username     text unique not null,
  display_name text,
  avatar_url   text,
  bio          text,
  location     text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index if not exists profiles_username_idx on public.profiles (lower(username));

create table if not exists public.restaurants (
  id             uuid primary key default gen_random_uuid(),
  ola_place_id   text unique not null,
  name           text not null,
  address        text,
  city           text,
  latitude       double precision,
  longitude      double precision,
  cuisine        text,
  category       text,
  image_url      text,
  metadata       jsonb,
  average_rating numeric(3,2),                    -- maintained by trigger
  review_count   integer not null default 0,     -- maintained by trigger
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);
create index if not exists restaurants_name_idx on public.restaurants (lower(name));
create index if not exists restaurants_city_idx on public.restaurants (lower(city));

create table if not exists public.reviews (
  id            uuid primary key default gen_random_uuid(),
  user_id       text not null references public.profiles(id) on delete cascade,
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  rating        numeric(2,1) not null check (rating >= 1 and rating <= 5),
  review_text   text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique (user_id, restaurant_id)
);
create index if not exists reviews_restaurant_idx on public.reviews (restaurant_id);
create index if not exists reviews_user_idx on public.reviews (user_id);

create table if not exists public.review_photos (
  id           uuid primary key default gen_random_uuid(),
  review_id    uuid not null references public.reviews(id) on delete cascade,
  user_id      text not null references public.profiles(id) on delete cascade,
  storage_path text not null,
  created_at   timestamptz not null default now()
);
create index if not exists review_photos_review_idx on public.review_photos (review_id);

create table if not exists public.visits (
  id            uuid primary key default gen_random_uuid(),
  user_id       text not null references public.profiles(id) on delete cascade,
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  visited_at    timestamptz not null default now(),
  created_at    timestamptz not null default now(),
  unique (user_id, restaurant_id)
);
create index if not exists visits_restaurant_idx on public.visits (restaurant_id);
create index if not exists visits_user_idx on public.visits (user_id);

create table if not exists public.follows (
  follower_id  text not null references public.profiles(id) on delete cascade,
  following_id text not null references public.profiles(id) on delete cascade,
  created_at   timestamptz not null default now(),
  primary key (follower_id, following_id),
  check (follower_id <> following_id)
);
create index if not exists follows_follower_idx on public.follows (follower_id);
create index if not exists follows_following_idx on public.follows (following_id);

create table if not exists public.likes (
  user_id    text not null references public.profiles(id) on delete cascade,
  review_id  uuid not null references public.reviews(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, review_id)
);
create index if not exists likes_review_idx on public.likes (review_id);

create table if not exists public.comments (
  id         uuid primary key default gen_random_uuid(),
  user_id    text not null references public.profiles(id) on delete cascade,
  review_id  uuid not null references public.reviews(id) on delete cascade,
  text       text not null check (length(btrim(text)) > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists comments_review_idx on public.comments (review_id);

create table if not exists public.lists (
  id              uuid primary key default gen_random_uuid(),
  owner_id        text not null references public.profiles(id) on delete cascade,
  title           text not null,
  description     text,
  cover_image_url text,
  visibility      text not null default 'public' check (visibility in ('public','private')),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create index if not exists lists_owner_idx on public.lists (owner_id);

create table if not exists public.list_items (
  id            uuid primary key default gen_random_uuid(),
  list_id       uuid not null references public.lists(id) on delete cascade,
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  position      integer not null default 0,
  created_at    timestamptz not null default now(),
  unique (list_id, restaurant_id)
);
create index if not exists list_items_list_idx on public.list_items (list_id);

create table if not exists public.saved_restaurants (
  user_id       text not null references public.profiles(id) on delete cascade,
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  created_at    timestamptz not null default now(),
  primary key (user_id, restaurant_id)
);

create table if not exists public.saved_lists (
  user_id    text not null references public.profiles(id) on delete cascade,
  list_id    uuid not null references public.lists(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, list_id)
);

create table if not exists public.activities (
  id            uuid primary key default gen_random_uuid(),
  user_id       text not null references public.profiles(id) on delete cascade,
  activity_type text not null check (activity_type in (
    'review_created','restaurant_visited','restaurant_saved','list_created','restaurant_added_to_list'
  )),
  restaurant_id uuid references public.restaurants(id) on delete cascade,
  review_id     uuid references public.reviews(id) on delete cascade,
  list_id       uuid references public.lists(id) on delete cascade,
  created_at    timestamptz not null default now()
);
create index if not exists activities_user_idx on public.activities (user_id);
create index if not exists activities_created_idx on public.activities (created_at desc);

create table if not exists public.notifications (
  id                uuid primary key default gen_random_uuid(),
  recipient_id      text not null references public.profiles(id) on delete cascade,
  actor_id          text not null references public.profiles(id) on delete cascade,
  notification_type text not null check (notification_type in (
    'follow','like','comment','list_follow','restaurant_added_to_list'
  )),
  review_id         uuid references public.reviews(id) on delete cascade,
  list_id           uuid references public.lists(id) on delete cascade,
  read              boolean not null default false,
  created_at        timestamptz not null default now()
);
create index if not exists notifications_recipient_idx
  on public.notifications (recipient_id, read, created_at desc);

-- ---------------------------------------------------------------------------
-- updated_at triggers
-- ---------------------------------------------------------------------------
create trigger profiles_touch    before update on public.profiles    for each row execute function public.touch_updated_at();
create trigger restaurants_touch before update on public.restaurants for each row execute function public.touch_updated_at();
create trigger reviews_touch     before update on public.reviews     for each row execute function public.touch_updated_at();
create trigger comments_touch    before update on public.comments    for each row execute function public.touch_updated_at();
create trigger lists_touch       before update on public.lists       for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- Restaurant rating aggregation (kept fresh; no client-side averaging)
-- ---------------------------------------------------------------------------
create or replace function public.refresh_restaurant_rating()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  rid uuid := coalesce(new.restaurant_id, old.restaurant_id);
begin
  update public.restaurants r
  set average_rating = agg.avg_rating,
      review_count   = agg.cnt,
      updated_at     = now()
  from (
    select round(avg(rating)::numeric, 2) as avg_rating,
           count(*)::int                  as cnt
    from public.reviews
    where restaurant_id = rid
  ) agg
  where r.id = rid;
  return coalesce(new, old);
end;
$$;

create trigger reviews_rating_aggregate
after insert or delete or update of rating on public.reviews
for each row execute function public.refresh_restaurant_rating();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.profiles          enable row level security;
alter table public.restaurants       enable row level security;
alter table public.reviews           enable row level security;
alter table public.review_photos     enable row level security;
alter table public.visits            enable row level security;
alter table public.follows           enable row level security;
alter table public.likes             enable row level security;
alter table public.comments          enable row level security;
alter table public.lists             enable row level security;
alter table public.list_items        enable row level security;
alter table public.saved_restaurants enable row level security;
alter table public.saved_lists       enable row level security;
alter table public.activities        enable row level security;
alter table public.notifications     enable row level security;

-- profiles
create policy profiles_select_all on public.profiles for select using (true);
create policy profiles_insert_self on public.profiles for insert with check (id = public.uid());
create policy profiles_update_self on public.profiles for update using (id = public.uid()) with check (id = public.uid());

-- restaurants (public read; any authenticated user can add/upsert via on-demand discovery)
create policy restaurants_select_all on public.restaurants for select using (true);
create policy restaurants_insert_auth on public.restaurants for insert with check (public.uid() is not null);
create policy restaurants_update_auth on public.restaurants for update using (public.uid() is not null) with check (public.uid() is not null);

-- reviews
create policy reviews_select_all on public.reviews for select using (true);
create policy reviews_insert_own on public.reviews for insert with check (user_id = public.uid());
create policy reviews_update_own on public.reviews for update using (user_id = public.uid()) with check (user_id = public.uid());
create policy reviews_delete_own on public.reviews for delete using (user_id = public.uid());

-- review_photos
create policy review_photos_select_all on public.review_photos for select using (true);
create policy review_photos_insert_own on public.review_photos for insert with check (user_id = public.uid());
create policy review_photos_delete_own on public.review_photos for delete using (user_id = public.uid());

-- visits
create policy visits_select_all on public.visits for select using (true);
create policy visits_insert_own on public.visits for insert with check (user_id = public.uid());
create policy visits_update_own on public.visits for update using (user_id = public.uid()) with check (user_id = public.uid());
create policy visits_delete_own on public.visits for delete using (user_id = public.uid());

-- follows (no self-follow; only manage your own follow edges)
create policy follows_select_all on public.follows for select using (true);
create policy follows_insert_own on public.follows for insert with check (follower_id = public.uid() and follower_id <> following_id);
create policy follows_delete_own on public.follows for delete using (follower_id = public.uid());

-- likes
create policy likes_select_all on public.likes for select using (true);
create policy likes_insert_own on public.likes for insert with check (user_id = public.uid());
create policy likes_delete_own on public.likes for delete using (user_id = public.uid());

-- comments
create policy comments_select_all on public.comments for select using (true);
create policy comments_insert_own on public.comments for insert with check (user_id = public.uid());
create policy comments_update_own on public.comments for update using (user_id = public.uid()) with check (user_id = public.uid());
create policy comments_delete_own on public.comments for delete using (user_id = public.uid());

-- lists (private lists visible only to owner)
create policy lists_select_visible on public.lists for select using (visibility = 'public' or owner_id = public.uid());
create policy lists_insert_own on public.lists for insert with check (owner_id = public.uid());
create policy lists_update_own on public.lists for update using (owner_id = public.uid()) with check (owner_id = public.uid());
create policy lists_delete_own on public.lists for delete using (owner_id = public.uid());

-- list_items (gated by parent list ownership / visibility)
create policy list_items_select_visible on public.list_items for select
  using (exists (select 1 from public.lists l where l.id = list_id and (l.visibility = 'public' or l.owner_id = public.uid())));
create policy list_items_insert_own on public.list_items for insert
  with check (exists (select 1 from public.lists l where l.id = list_id and l.owner_id = public.uid()));
create policy list_items_update_own on public.list_items for update
  using (exists (select 1 from public.lists l where l.id = list_id and l.owner_id = public.uid()));
create policy list_items_delete_own on public.list_items for delete
  using (exists (select 1 from public.lists l where l.id = list_id and l.owner_id = public.uid()));

-- saved_restaurants / saved_lists (private to the user)
create policy saved_restaurants_own on public.saved_restaurants for select using (user_id = public.uid());
create policy saved_restaurants_insert_own on public.saved_restaurants for insert with check (user_id = public.uid());
create policy saved_restaurants_delete_own on public.saved_restaurants for delete using (user_id = public.uid());

create policy saved_lists_own on public.saved_lists for select using (user_id = public.uid());
create policy saved_lists_insert_own on public.saved_lists for insert with check (user_id = public.uid());
create policy saved_lists_delete_own on public.saved_lists for delete using (user_id = public.uid());

-- activities (public feed source; you only create/delete your own)
create policy activities_select_all on public.activities for select using (true);
create policy activities_insert_own on public.activities for insert with check (user_id = public.uid());
create policy activities_delete_own on public.activities for delete using (user_id = public.uid());

-- notifications (recipient-only read/update; actor creates)
create policy notifications_select_own on public.notifications for select using (recipient_id = public.uid());
create policy notifications_insert_actor on public.notifications for insert with check (actor_id = public.uid());
create policy notifications_update_own on public.notifications for update using (recipient_id = public.uid()) with check (recipient_id = public.uid());
create policy notifications_delete_own on public.notifications for delete using (recipient_id = public.uid());
