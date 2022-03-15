CREATE DATABASE forum_example;
\connect forum_example;
/*Create user table in public schema*/
CREATE TABLE public.user (
    username TEXT PRIMARY KEY,
    pass TEXT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE public.user IS
'Forum users.';