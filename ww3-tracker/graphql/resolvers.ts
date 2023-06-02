import { getLinkPreview } from "link-preview-js";

export const resolvers = {
  Query: {
    users: (_: any, __: any, { dataSources }: any) =>
      dataSources.userAPI.getAllUsers(),
    user: (_: any, { username }: any, { dataSources }: any) =>
      dataSources.userAPI.getUserByUsername({ username }),
    posts: (_: any, __: any, { dataSources }: any) =>
      dataSources.postAPI.getAllPosts(),
    post: async (_: any, { id }: any, { dataSources }: any) =>
      dataSources.postAPI.getPostById({ postId: id }),
    preview: (_: any, { url }: any, __: any) => getLinkPreview(url),
    comments: (_: any, __: any, { dataSources }: any) =>
      dataSources.commentAPI.getAllComments(),
    commentVote: (_: any, { id }: any, { dataSources, user }: any) =>
      dataSources.commentVoteAPI.getVoteById({ commentId: id, user }),
    postVote: (_: any, { id }: any, { dataSources, user }: any) =>
      dataSources.postVoteAPI.getVoteById({ postId: id, user }),
  },

  Post: {
    comments: async (
      post: { id: any },
      { pageSize, offset }: any,
      { dataSources }: any
    ) =>
      dataSources.commentAPI.getCommentsByPostId({
        postId: post.id,
        pageSize,
        offset,
      }),
    author: async (post: { author: any }, _: any, { dataSources }: any) =>
      dataSources.userAPI.getUserByUsername({ username: post.author }),
    upvotes: async (post: { id: any }, _: any, { dataSources }: any) =>
      dataSources.postVoteAPI.getVoteCountByPost({
        postId: post.id,
        voteType: "up",
      }),
    downvotes: async (post: { id: any }, _: any, { dataSources }: any) =>
      dataSources.postVoteAPI.getVoteCountByPost({
        postId: post.id,
        voteType: "down",
      }),
    numOfComments: async (post: { id: any }, _: any, { dataSources }: any) =>
      dataSources.commentAPI.getNumOfCommentsByPostId({ postId: post.id }),
  },

  PostVote: {
    user: async (postVote: { username: any }, _: any, { dataSources }: any) =>
      dataSources.userAPI.getUserByUsername({ username: postVote.username }),
    post: async (postVote: { postId: any }, _: any, { dataSources }: any) =>
      dataSources.postAPI.getPostById({ postId: postVote.postId }),
  },

  Comment: {
    author: async (comment: { author: any }, _: any, { dataSources }: any) =>
      dataSources.userAPI.getUserByUsername({ username: comment.author }),
    post: async (comment: { postId: any }, _: any, { dataSources }: any) =>
      dataSources.postAPI.getPostById({ postId: comment.postId }),
    upvotes: async (comment: { id: any }, _: any, { dataSources }: any) =>
      dataSources.commentVoteAPI.getVoteCountByComment({
        commentId: comment.id,
        voteType: "up",
      }),
    downvotes: async (comment: { id: any }, _: any, { dataSources }: any) =>
      dataSources.commentVoteAPI.getVoteCountByComment({
        commentId: comment.id,
        voteType: "down",
      }),
  },

  CommentVote: {
    user: async (
      commentVote: { username: any },
      _: any,
      { dataSources }: any
    ) =>
      dataSources.userAPI.getUserByUsername({ username: commentVote.username }),
    comment: async (
      commentVote: { commentId: any },
      _: any,
      { dataSources }: any
    ) =>
      dataSources.commentAPI.getCommentById({
        commentId: commentVote.commentId,
      }),
  },

  Mutation: {
    submitPost: async (_: any, args: any, { dataSources, user }: any) => {
      if (!user) return null;
      const submitPostResponse = await dataSources.postAPI.submitPost({
        ...args,
        user,
      });
      return submitPostResponse;
    },
    submitComment: async (_: any, args: any, { dataSources, user }: any) => {
      if (!user) return null;
      const submitCommentResponse = await dataSources.commentAPI.submitComment({
        ...args,
        user,
      });
      return submitCommentResponse;
    },
    submitCommentVote: async (
      _: any,
      args: any,
      { dataSources, user }: any
    ) => {
      if (!user) return null;
      const submitCommentVoteResponse =
        await dataSources.commentVoteAPI.submitCommentVote({ ...args, user });
      return submitCommentVoteResponse;
    },
    submitPostVote: async (_: any, args: any, { dataSources, user }: any) => {
      if (!user) return null;
      const submitPostVoteResponse =
        await dataSources.postVoteAPI.submitPostVote({ ...args, user });
      return submitPostVoteResponse;
    },
    deleteCommentVote: async (
      _: any,
      args: any,
      { dataSources, user }: any
    ) => {
      if (!user) return null;
      const deleteVoteResponse =
        await dataSources.commentVoteAPI.deleteCommentVote({ ...args, user });
      return deleteVoteResponse;
    },
    deletePostVote: async (_: any, args: any, { dataSources, user }: any) => {
      if (!user) return null;
      const deleteVoteResponse = await dataSources.postVoteAPI.deletePostVote({
        ...args,
        user,
      });
      return deleteVoteResponse;
    },
  },
};
