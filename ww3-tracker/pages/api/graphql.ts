import { ApolloServer } from "apollo-server-micro";
import UserAPI from "../../database/user";
import PostAPI from "../../database/post";
import CommentAPI from "../../database/comment";
import typeDefs from "../../graphql/schema";
import CommentVoteAPI from "../../database/commentVote";
import PostVoteAPI from "../../database/postVote";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { ServerResponse, IncomingMessage } from "http";
import { resolvers } from "graphql/resolvers";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      userAPI: new UserAPI(),
      postAPI: new PostAPI(),
      commentAPI: new CommentAPI(),
      commentVoteAPI: new CommentVoteAPI(),
      postVoteAPI: new PostVoteAPI(),
    };
  },
  context: ({ req: MicroRequest }) => {
    const token = MicroRequest.cookies.token;
    if (!token) return { user: null };
    const jwt = require("jsonwebtoken");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { user: decoded.username };
  },
});

const startServer = apolloServer.start();

export default async function handler(
  req: MicroRequest,
  res: ServerResponse<IncomingMessage>
) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://studio.apollographql.com"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
  return true;
}

export const config = {
  api: {
    bodyParser: false,
  },
};
