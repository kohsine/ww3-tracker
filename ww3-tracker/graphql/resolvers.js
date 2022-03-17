export const Query = {
  users: (_, __, { dataSources }) => dataSources.userAPI.getAllUsers(),
  user: (_, { username }, { dataSources }) => dataSources.userAPI.getUserByUsername({ username: username }),
  posts: (_, __, { dataSources }) => dataSources.postAPI.getAllPosts()
};