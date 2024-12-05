create extension if not exists "uuid-ossp";

create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.jobs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  company_name text not null,
  position_title text not null,
  status text not null,
  priority text not null,
  location text,
  salary text,
  application_deadline timestamp with time zone,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.tasks (
  id uuid default uuid_generate_v4() primary key,
  job_id uuid references public.jobs(id) on delete cascade,
  title text not null,
  description text,
  due_date timestamp with time zone,
  completed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.documents (
  id uuid default uuid_generate_v4() primary key,
  job_id uuid references public.jobs(id) on delete cascade,
  name text not null,
  type text not null,
  url text not null,
  uploaded_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.interviews (
  id uuid default uuid_generate_v4() primary key,
  job_id uuid references public.jobs(id) on delete cascade,
  date timestamp with time zone not null,
  format text not null,
  notes text,
  feedback text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;
alter table public.jobs enable row level security;
alter table public.tasks enable row level security;
alter table public.documents enable row level security;
alter table public.interviews enable row level security;


create policy "Users can view own profile" 
  on public.profiles for select 
  using (auth.uid() = id);

create policy "Users can update own profile" 
  on public.profiles for update 
  using (auth.uid() = id);

create policy "Users can view own jobs" 
  on public.jobs for select 
  using (auth.uid() = user_id);

create policy "Users can insert own jobs" 
  on public.jobs for insert 
  with check (auth.uid() = user_id);

create policy "Users can update own jobs" 
  on public.jobs for update 
  using (auth.uid() = user_id);

create policy "Users can delete own jobs" 
  on public.jobs for delete 
  using (auth.uid() = user_id);