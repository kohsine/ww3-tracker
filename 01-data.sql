\connect ww3_tracker;

/*Create some dummy users*/
INSERT INTO public.users (username, pass) VALUES
('Benjie', 'asdf'),
('Singingwolfboy', 'asdff'),
('Lexius', '1234');

INSERT INTO public.posts (title, description, lng, lat, author, url) VALUES
('title', 'description', 35, 50, 'Benjie', 'link'),
('Wide Putin', 'Putin is wiiiiideee.', 37, 49, 'Lexius', 'http://google.com'),
('Ukrained being nuked', 'Description', 36, 51, 'Lexius', 'http://google.com1');

INSERT INTO public.comments (content, author, postId) VALUES
('hello i am biggus dickus', 'Benjie', 1),
('comment hnghhhhhhh', 'Lexius', 2),
('interesting comment hollhjljlj', 'Benjie', 3),
('hello i am smol dickus', 'Benjie', 1);
