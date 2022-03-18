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
  lng DECIMAL,
  lat DECIMAL,
  author TEXT REFERENCES users,
  url TEXT,
  media_type TEXT,
  content_type TEXT,
  favicon TEXT,
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.comments (
  id SERIAL PRIMARY KEY,
  content TEXT,
  author TEXT REFERENCES users,
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
