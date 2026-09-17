create extension if not exists pgcrypto;

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  name varchar(80) not null,
  phone varchar(20) not null unique,
  city varchar(40) not null check (city in ('Beni', 'Goma', 'Bunia')),
  role varchar(20) not null check (role in ('client', 'provider')),
  password_hash text not null,
  created_at timestamptz not null default now()
);
create table if not exists sessions (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references users(id) on delete cascade,
  token_hash char(64) not null unique, expires_at timestamptz not null, created_at timestamptz not null default now()
);
create index if not exists sessions_expires_idx on sessions(expires_at);
create table if not exists provider_profiles (
  user_id uuid primary key references users(id) on delete cascade,
  category varchar(80) not null, headline varchar(120) not null, description text not null,
  years_experience integer not null default 0 check (years_experience between 0 and 70),
  verified boolean not null default false, is_active boolean not null default true,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index if not exists providers_category_idx on provider_profiles(category, is_active);
create table if not exists service_requests (
  id uuid primary key default gen_random_uuid(), client_id uuid not null references users(id) on delete cascade,
  city varchar(40) not null check (city in ('Beni', 'Goma', 'Bunia')), category varchar(80) not null,
  title varchar(120) not null, description text not null, neighborhood varchar(100), budget varchar(80),
  contact_phone varchar(20) not null, status varchar(20) not null default 'open' check (status in ('open', 'closed')),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index if not exists requests_search_idx on service_requests(city, category, status, created_at desc);
