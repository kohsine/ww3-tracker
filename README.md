# WW3 Tracker

## Project URL

https://worldwar3tracker.com/

## Project Video URL 

**Task:** Provide the link to your youtube video. Please make sure the link works. 

## Project Description

**Task:** Provide a detailed description of your app

Our app is a content sharing platform with a focus on geographic location. 

## Development

**Task:** Leaving deployment aside, explain how the app is built. Please describe the overall code design and be specific about the programming languages, framework, libraries and third-party api that you have used. 

Starting from the client side, every page is rendered using React. There are two main libraries we use in the frontend. Google map react is responsible for basic map functionalities like zooming and dragging and also exposing an API so that we can add additional elements on the map like points. Material UI is the CSS library we use that is based on Google's material theme. All of the http requests from the client to the server are done using one GraphQL endpoint, with the exception of login, signup, and file upload. We use Apollo Client as the GraphQL library in the frontend which we use to send GraphQL queries to the server. 

Once the GraphQL query makes it to the server, it is processed by Next.js which is what we are using as our server framework. Notice how our project does not explicitly define endpoints, and that is because Next.js maps endpoints to the folder structure. The GraphQL server is defined initially at pages/api/graphql.js. We then use Apollo Server to process the GraphQL query and we have defined a schema and resolvers to communicate with the database. The schema is located under graphql/schema.js and the resolver is located under graphql/resolvers.js. The resolver then communicates with the database using the API we have defined under database/. Finally Apollo Server sends the retrieved data back to the client which is then processed by Apollo Client and displayed using React.

We are using PostgreSQL as our database and it is initialized using docker and docker-compose which is all contained under the folder docker-database/.

You may have noticed a data-gen folder outside the ww3-tracker folder and this is a separate project that we use to generate random geographical coordinates containing random unsplash photos.

## Deployment

**Task:** Explain how you have deployed your application. 

## Maintenance

**Task:** Explain how you monitor your deployed app to make sure that everything is working as expected.

## Challenges

**Task:** What is the top 3 most challenging things that you have learned/developed for you app? Please restrict your answer to only three items. 

1. 
2. GraphQL
3. Docker

## Contributions

**Task:** Describe the contribution of each team member to the project. Please provide the full name of each team member (but no student number). 

Kevin Oh:
1. Project setup
2. Backend

Ian Gu:

# One more thing? 

**Task:** Any additional comment you want to share with the course staff? 
