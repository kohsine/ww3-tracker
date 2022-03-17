\connect ww3_tracker;

/*Create some dummy users*/
INSERT INTO public.users (username, pass) VALUES
('Benjie', 'asdf'),
('Singingwolfboy', 'asdff'),
('Lexius', '1234');

INSERT INTO public.posts (title, description, lon, lat, author, url) VALUES
('title', 'description', 102, 105, 'Benjie', 'link'),
('Wide Putin', 'Putin is wiiiiideee.', 102.567, -103.56, 'Lexius', 'http://google.com'),
('Ukrained being nuked', 'Description', 100.567, -102.56, 'Lexius', 'http://google.com1');