export const Query = {
  users: (_, __, { dataSources }) => dataSources.userAPI.getAllUsers(),
  user: (_, { username }, { dataSources }) => dataSources.userAPI.getUserByUsername({ username: username }),
  posts: (_, __, { dataSources }) => dataSources.postAPI.getAllPosts()
};

export const Mutation = {
  submitPost: async (_, args, { dataSources, user }) => {
    const submitPostResponse = await dataSources.postAPI.submitPost({ ...args, user });
    return submitPostResponse;
  },
}