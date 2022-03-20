# WW3-Tracker

## Team members
---
- Ian Gu
- Kevin Oh

## Web application
---
This application allows users to submit multimedia (images, videos, news articles, etc) and allows users to add an optional corresponding location on a map of Ukraine. The content on this site is user driven, and thus users can report content for different reasons, and moderators can review the reports and make appropriate decisions. Users may also upvote/downvote posts, and sort/filter posts.

## Beta features
---
- User authentication (create an account, login, signout)
- Submission of content
- Content is organized on map
- Ability to report content
- Ability to upvote / downvote content

## Final features
---
- Preview content on map
- Custom icons for map marker
- Content may be filtered / sorted
- Moderators can control content

## Tech stack
---
### Frontend
- React.js
- Material UI

### Backend
- Express.js
- GraphQL
- MongoDB
- AWS S3

### Deploy
- Heroku for backend
- CloudFlare for frontend

## Top 5 technical challenges
---
- Finding a geographic map solution for React.

   At first glance, it is unclear whether many libraries are suitable for our needs. We may have to experiment, or even build our own solution to support everything we need. More detail below.

- How to retrieve coordinates from clicking on the map?

   This seems trivial at first, but there is little documentation in the current library. If not supported, we may have to look around.

- How to filter posts based on the current view of the map.
   
   If you move the map around or zoom in, some markers will no longer be visible. These posts should then be hidden. How will the math work to filter out certain geographic coordinates?

- How to deal with too many markers overlapping?

   If too many markers are on the same area of the map, should they be combined into a larger marker? If so, much research should be done on how the UI should work then. We have to consider things like zooming in, where then the overlap should lessen.

- How should multimedia be treated?

   The application allows users to submit both photos and videos. How should they be displayed in a consistent and aesthetic manner? What if the aspect ratios are different?

- Multimedia preview

   Hovering over a marker gives you a preview of the content. How will this affect the map? Will the design need to be responsive?