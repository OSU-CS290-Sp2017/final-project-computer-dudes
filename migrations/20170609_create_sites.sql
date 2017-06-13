CREATE TABLE sites (
  id serial primary key not null,
  name text not null,
  created_at timestamp not null default now(),
  updated_at timestamp not null default now()
);
