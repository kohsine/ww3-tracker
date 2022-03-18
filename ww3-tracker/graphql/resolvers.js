import { getLinkPreview } from "link-preview-js";

export const Query = {
  users: (_, __, { dataSources }) => dataSources.userAPI.getAllUsers(),
  user: (_, { username }, { dataSources }) => dataSources.userAPI.getUserByUsername({ username: username }),
  posts: (_, __, { dataSources }) => dataSources.postAPI.getAllPosts(),
  preview: (_, { url }, { dataSources }) => getLinkPreview(url),
};

export const Mutation = {
  submitPost: async (_, args, { dataSources, user }) => {
    const submitPostResponse = await dataSources.postAPI.submitPost({ ...args, user });
    return submitPostResponse;
  },
}