import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type Query {
    users: [User!]!
    user(username: String!): User
    me: User
    posts: [Post!]!
    preview(url: String!): Preview!
  }
  type Mutation {
    submitPost(
      title: String!, 
      description: String, 
      lng: Float, 
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
    lng: Float
    lat: Float
    author: User!
    url: String!
    media_type: String
    content_type: String
    favicon: String
  }
  type SubmitPostResponse {
    success: Boolean!
    message: String
    postId: ID
  }
  type Preview {
    url: String!
    title: String
    images: [String]
    mediaType: String
    contentType: String
    favicons: [String]
  }
`;

export default typeDefs;