import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type Query {
    users: [User!]!
    user(username: String!): User
    me: User
    posts: [Post!]!
    post(id: ID!): Post
    preview(url: String!): Preview!
    comments: [Comment!]!
  }
  type Mutation {
    submitPost(
      title: String!, 
      description: String, 
      lng: Float, 
      lat: Float, 
      url: String!
    ): SubmitPostResponse!

    submitComment(
      content: String!,
      postId: ID!
    ): SubmitCommentResponse!
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
    comments: [Comment!]!
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
  type Comment {
    id: ID!
    content: String!
    author: User!
    post: Post!
    date: String!
  }
  type SubmitCommentResponse {
    success: Boolean!
    message: String
    commentId: ID
  }
`;

export default typeDefs;