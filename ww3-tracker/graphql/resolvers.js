export const Query = {
  users: (_, __, { dataSources }) => dataSources.userAPI.getAllUsers()
};