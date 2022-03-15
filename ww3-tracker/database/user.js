const { Pool, Client } = require('pg')

class UserAPI {
  async getAllUsers() {

    const client = new Client({
      user: 'postgres',
      host: 'localhost',
      database: 'forum_example',
      password: 'example',
      port: 5432,
      schema: 'public',
    })
    client.connect()
    return client.query('SELECT * FROM "user";')
    .then(res => {
      console.log(JSON.stringify(res.rows));
      return res.rows;
    })
    .catch(e => console.error(e.stack))
  }
}

export default UserAPI;