# WW3 Tracker

## Project URL

https://worldwar3tracker.com/

## Project Video URL 

https://youtu.be/9O1ToE8xet4

## Project Description

The app is a content sharing platform with a focus on geographic location. Users may pick a place on the map and share content in the form of a link (articles, videos, etc), or upload their own files (photos, videos, etc). Users can then view other submissions by clicking a marker on the map. A preview (only for photos and links) of the content is shown, which the user can upvote/downvote, or comment on. Users may also click the post which will take them to the full link/article/photo. The aim of the application is to help track the current events in Ukraine, and see the developments throughout the city.

## Development

Starting from the client side, every page is rendered using React. There are two main libraries we use in the frontend. Google map react is responsible for basic map functionalities like zooming and dragging and also exposing an API so that we can add additional elements on the map like points. Material UI is the CSS library we use that is based on Google's material theme. All of the http requests from the client to the server are done using one GraphQL endpoint, with the exception of login, signup, and file upload. Apollo Client is used as the GraphQL implementation in the frontend which we use to send GraphQL queries to the server. 

Once the GraphQL query makes it to the server, it is processed by Next.js. Notice how our project does not explicitly define endpoints, and that is because Next.js maps endpoints to the folder structure. The GraphQL server is defined initially at pages/api/graphql.js. Apollo Server then processes the GraphQL query and a schema and resolvers are defined to communicate with the database. The schema is located under graphql/schema.js and the resolver is located under graphql/resolvers.js. The resolver then communicates with the database using the API defined under database/. Finally Apollo Server sends the retrieved data back to the client which is then processed by Apollo Client and displayed using React.

PostgreSQL is our database and it is initialized using docker and docker-compose which is all contained under the folder docker-database/.

You may have noticed a data-gen folder outside the ww3-tracker folder and this is a separate project that generates random geographical coordinates containing random unsplash photos.

## Deployment

The application is deployed on Amazon Web Services. Specifically, it is running on a EC2 instance with Ubuntu. The database is dockerized which makes it easy to deploy on any machine. On AWS, we are also using Route54 which points to our custom (domain) name servers, and also an S3 bucket which stores the content.

The VM is running an nginx reverse proxy which redirects outside requests over https from port 80 to PM2 process which runs on port 3000. PM2 is used to keep the application running at all times, and also easily manage the process.

## Maintenance

Sentry alerts set up so whenever there are errors in the app, they are logged and notifications are sent in real time.

## Contributions

Kevin Oh:
1. Project setup
2. Backend

Ian Gu:
1. Frontend
2. Deployment
