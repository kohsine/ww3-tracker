DROP TABLE IF EXISTS app_public.accounts;

CREATE TABLE app_public.accounts (
  user_id serial PRIMARY KEY,
  username VARCHAR ( 50 ) UNIQUE NOT NULL,
  password VARCHAR ( 50 ) NOT NULL,
  email VARCHAR ( 255 ) UNIQUE NOT NULL,
  created_on TIMESTAMP NOT NULL,
  last_login TIMESTAMP 
);

INSERT INTO 
  app_public.accounts (user_id, username, password, email, created_on)
VALUES
  (1, 'kevin', 'asdf', 'kevoh1516@gmail.com', '1999-01-08 04:05:06'),
  (2,'ian', 'asdf', 'iangu@gmail.com', '1999-01-08 04:05:06'),
  (3,'Bing', 'asdf', 'dingdong@gmail.com', '1999-01-08 04:05:06');
