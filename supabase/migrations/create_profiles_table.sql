create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  wellness_theme text,
  is_dark_mode boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Create a policy to allow users to read their own profile
create policy "Users can read their own profile"
  on public.profiles for select
  using ( auth.uid() = id );

-- Create a policy to allow users to update their own profile
create policy "Users can update their own profile"
  on public.profiles for update
  using ( auth.uid() = id );

-- Create a trigger to set updated_at on update
create function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger handle_profiles_updated_at
  before update on public.profiles
  for each row
  execute procedure public.handle_updated_at();