CREATE TABLE users (
  id serial primary key not null,
  name text not null,
  email text not null,
  password_digest text not null,
  created_at timestamp not null default now(),
  updated_at timestamp not null default now()
);

CREATE UNIQUE INDEX email_idx ON users (email);
