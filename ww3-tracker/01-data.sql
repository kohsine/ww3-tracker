\connect ww3_tracker;

/*Create some dummy users*/
INSERT INTO public.users (username, pass) VALUES
('Benjie', 'asdf'),
('Singingwolfboy', 'asdff'),
('Lexius', '1234');

INSERT INTO public.posts (title, description, lng, lat, author, url, media_type, content_type, favicon) VALUES
('title', 'description', 35, 50, 'Benjie', 'link', 'video', 'video/mp4', 'https://ww3tracker.s3.amazonaws.com/favicon.ico'),
('Wide Putin', 'Putin is wiiiiideee.', 37, 49, 'Lexius', 'http://google.com', 'mediatype', 'contenttype', 'faviconlink'),
('Ukrained being nuked', 'Description', 36, 51, 'Lexius', 'http://google.com1', 'mediatype', 'contenttype', 'faviconlink');

INSERT INTO public.comments (content, author) VALUES
('hello i am biggus dickus', 'Benjie'),
('comment hnghhhhhhh', 'Lexius'),
('interesting comment hollhjljlj', 'Benjie');
