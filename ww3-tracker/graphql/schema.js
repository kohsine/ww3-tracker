import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type Query {
    users: [User!]!
    user(username: String!): User
    me: User
    posts: [Post!]!
  }
  type Mutation {
    submitPost(
      title: String!, 
      description: String, 
      lon: Float, 
      lat: Float, 
      url: String!
    ): SubmitPostResponse!
  }
  type User {
    username: String!
  }
  type Post {
    id: ID!
    title: String!
    description: String
    lon: Float
    lat: Float
    author: User!
    url: String!
  }
  type SubmitPostResponse {
    success: Boolean!
    message: String
    post: Post
  }
`;

export default typeDefs;