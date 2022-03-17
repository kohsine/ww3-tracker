CREATE DATABASE ww3_tracker;
\connect ww3_tracker;
/*Create user table in public schema*/
CREATE TABLE public.users (
  username TEXT PRIMARY KEY,
  pass TEXT,
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.posts (
  id SERIAL PRIMARY KEY,
  title TEXT,
  description TEXT,
  lon DECIMAL,
  lat DECIMAL,
  author TEXT REFERENCES users,
  url TEXT UNIQUE
);
