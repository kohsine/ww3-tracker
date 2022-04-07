import { getLinkPreview } from "link-preview-js";

export const Query = {
  users: (_, __, { dataSources }) => dataSources.userAPI.getAllUsers(),
  user: (_, { username }, { dataSources }) => dataSources.userAPI.getUserByUsername({ username: username }),
  posts: (_, __, { dataSources }) => dataSources.postAPI.getAllPosts(),
  post: async (_, { id }, { dataSources }) => dataSources.postAPI.getPostById({ postId: id }),
  preview: (_, { url }, { dataSources }) => getLinkPreview(url),
  comments: (_, __, { dataSources }) => dataSources.commentAPI.getAllComments(),
  commentVote: (_, { id }, { dataSources, user }) => dataSources.commentVoteAPI.getVoteById({ commentId: id, user }),
  postVote: (_, { id }, { dataSources, user }) => dataSources.postVoteAPI.getVoteById({ postId: id, user })
};

export const Post = {
  comments: async (post, { pageSize, offset }, { dataSources }) =>
    dataSources.commentAPI.getCommentsByPostId({ postId: post.id, pageSize, offset }),
  author: async (post, _, { dataSources }) =>
    dataSources.userAPI.getUserByUsername({ username: post.author }),
  upvotes: async (post, _, { dataSources }) =>
    dataSources.postVoteAPI.getVoteCountByPost({ postId: post.id, voteType: 'up' }),
  downvotes: async (post, _, { dataSources }) =>
    dataSources.postVoteAPI.getVoteCountByPost({ postId: post.id, voteType: 'down' })
};

export const PostVote = {
  user: async (postVote, _, { dataSources }) =>
    dataSources.userAPI.getUserByUsername({ username: postVote.username}),
  post: async (postVote, _, { dataSources }) =>
    dataSources.postAPI.getPostById({ postId: postVote.postId }),
}

export const Comment = {
  author: async (comment, _, { dataSources }) =>
    dataSources.userAPI.getUserByUsername({ username: comment.author}),
  post: async (comment, _, { dataSources }) =>
    dataSources.postAPI.getPostById({ postId: comment.postId }),
  upvotes: async (comment, _, { dataSources }) =>
    dataSources.commentVoteAPI.getVoteCountByComment({ commentId: comment.id, voteType: 'up' }),
  downvotes: async (comment, _, { dataSources }) =>
    dataSources.commentVoteAPI.getVoteCountByComment({ commentId: comment.id, voteType: 'down' })
}

export const CommentVote = {
  user: async (commentVote, _, { dataSources }) =>
    dataSources.userAPI.getUserByUsername({ username: commentVote.username}),
  comment: async (commentVote, _, { dataSources }) =>
    dataSources.commentAPI.getCommentById({ commentId: commentVote.commentId }),
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
  submitCommentVote: async (_, args, { dataSources, user }) => {
    const submitCommentVoteResponse = await dataSources.commentVoteAPI.submitCommentVote({ ...args, user });
    return submitCommentVoteResponse;
  },
  submitPostVote: async (_, args, { dataSources, user }) => {
    const submitPostVoteResponse = await dataSources.postVoteAPI.submitPostVote({ ...args, user });
    return submitPostVoteResponse;
  },
  deleteCommentVote: async (_, args, { dataSources, user }) => {
    const deleteVoteResponse = await dataSources.commentVoteAPI.deleteCommentVote({ ...args, user });
    return deleteVoteResponse;
  },
  deletePostVote: async (_, args, { dataSources, user }) => {
    const deleteVoteResponse = await dataSources.postVoteAPI.deletePostVote({ ...args, user });
    return deleteVoteResponse;
  },
};