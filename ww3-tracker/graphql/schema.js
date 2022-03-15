import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type Query {
    users: [User!]!
    user(id: ID!): User
    me: User
  }
  type User {
    id: ID!
    username: String!
    password: String!
  }
`;

export default typeDefs;