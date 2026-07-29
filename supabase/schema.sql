-- Run this once in the Supabase dashboard: SQL Editor -> New query -> Run.
-- Safe to re-run; every statement is guarded.

-- ---------------------------------------------------------------------------
-- Images added from the owner panel, keyed by the dotted section path used in
-- src/data/images.js (e.g. "home.hero", "functions.wedding.mehendi-haldi").
-- ---------------------------------------------------------------------------
create table if not exists public.site_images (
  id uuid primary key default gen_random_uuid(),
  section_path text not null,
  url text not null,
  created_at timestamptz not null default now(),
  constraint site_images_unique_url unique (section_path, url)
);

create index if not exists site_images_section_path_idx
  on public.site_images (section_path, created_at);

-- ---------------------------------------------------------------------------
-- Testimonials. "event_date" is free text so the owner can write "12 June 2025".
-- ---------------------------------------------------------------------------
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  names text not null,
  quote text not null,
  event_date text not null default '',
  image_url text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists testimonials_created_at_idx
  on public.testimonials (created_at desc);

-- ---------------------------------------------------------------------------
-- Row level security. Reads and writes are open to the anon key because the
-- site has no login: anyone who finds the hidden owner trigger can edit.
-- ---------------------------------------------------------------------------
alter table public.site_images enable row level security;
alter table public.testimonials enable row level security;

drop policy if exists site_images_public_read on public.site_images;
create policy site_images_public_read
  on public.site_images for select to anon, authenticated using (true);

drop policy if exists site_images_public_insert on public.site_images;
create policy site_images_public_insert
  on public.site_images for insert to anon, authenticated with check (true);

drop policy if exists site_images_public_delete on public.site_images;
create policy site_images_public_delete
  on public.site_images for delete to anon, authenticated using (true);

drop policy if exists testimonials_public_read on public.testimonials;
create policy testimonials_public_read
  on public.testimonials for select to anon, authenticated using (true);

drop policy if exists testimonials_public_insert on public.testimonials;
create policy testimonials_public_insert
  on public.testimonials for insert to anon, authenticated with check (true);

drop policy if exists testimonials_public_delete on public.testimonials;
create policy testimonials_public_delete
  on public.testimonials for delete to anon, authenticated using (true);

-- ---------------------------------------------------------------------------
-- Public storage bucket for files uploaded straight from a phone or computer.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('site-media', 'site-media', true)
on conflict (id) do update set public = true;

drop policy if exists site_media_public_read on storage.objects;
create policy site_media_public_read
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'site-media');

drop policy if exists site_media_public_insert on storage.objects;
create policy site_media_public_insert
  on storage.objects for insert to anon, authenticated
  with check (bucket_id = 'site-media');

drop policy if exists site_media_public_delete on storage.objects;
create policy site_media_public_delete
  on storage.objects for delete to anon, authenticated
  using (bucket_id = 'site-media');
