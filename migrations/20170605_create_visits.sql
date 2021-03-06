create table visits (
  id serial primary key not null,
  site_id serial references sites (id) on delete cascade,
  resource text,
  referrer text,
  title text,
  user_agent text,
  timestamp timestamp not null default now()
);
