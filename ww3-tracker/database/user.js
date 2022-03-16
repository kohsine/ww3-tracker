const { Pool, Client } = require('pg')
import { pg_config } from './connect'

class UserAPI {
  async getAllUsers() {

    const client = new Client(pg_config)
    client.connect()
    return client.query('SELECT * FROM "user";')
    .then(res => {
      console.log(JSON.stringify(res.rows));
      return res.rows;
    })
    .catch(e => console.error(e.stack))
    .finally(() => client.end());
  }
}

export default UserAPI;