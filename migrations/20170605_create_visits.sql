create table vists (
  id serial primary key not null,
  site_id text not null,
  resource text,
  title text,
  user_agent text,
  timestamp not null default now()
);
