import client from './client';

class UserAPI {
  async getAllUsers() {
    return client.query('SELECT * FROM users;')
    .then(res => {
      return res.rows;
    })
    .catch(e => console.error(e.stack))
  }

  async getUserByUsername({ username }) {
    return { username: username };
  }
}

export default UserAPI;