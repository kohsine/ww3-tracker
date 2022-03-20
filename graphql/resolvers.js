import { getLinkPreview } from "link-preview-js";

export const Query = {
  users: (_, __, { dataSources }) => dataSources.userAPI.getAllUsers(),
  user: (_, { username }, { dataSources }) => dataSources.userAPI.getUserByUsername({ username: username }),
  posts: (_, __, { dataSources }) => dataSources.postAPI.getAllPosts(),
  post: async (_, { id }, { dataSources }) => dataSources.postAPI.getPostById({ postId: id }),
  preview: (_, { url }, { dataSources }) => getLinkPreview(url),
  comments: (_, __, { dataSources }) => dataSources.commentAPI.getAllComments()
};

export const Post = {
  comments: async (post, _, { dataSources }) =>
    dataSources.commentAPI.getCommentsByPostId({ postId: post.id }),
  author: async (post, _, { dataSources }) =>
    dataSources.userAPI.getUserByUsername({ username: post.author }),
};

export const Comment = {
  author: async (comment, _, { dataSources }) =>
    dataSources.userAPI.getUserByUsername({ username: comment.author}),
  post: async (comment, _, { dataSources }) =>
    dataSources.postAPI.getPostById({ postId: comment.postId }),
}

export const Mutation = {
  submitPost: async (_, args, { dataSources, user }) => {
    const submitPostResponse = await dataSources.postAPI.submitPost({ ...args, user });
    return submitPostResponse;
  },
  submitComment: async (_, args, { dataSources, user }) => {
    const submitCommentResponse = await dataSources.commentAPI.submitComment({ ...args, user });
    return submitCommentResponse;
  },
};