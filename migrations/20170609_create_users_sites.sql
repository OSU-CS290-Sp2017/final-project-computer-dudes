CREATE TABLE users_sites (
  id serial primary key not null,
  user_id serial references users (id),
  site_id serial references sites (id) on delete cascade
);
