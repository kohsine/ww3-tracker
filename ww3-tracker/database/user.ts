import { getClient } from "./client";
import { DataSource } from "apollo-datasource";

class UserAPI extends DataSource {
  async getAllUsers() {
    const client = await getClient();
    return client
      .query("SELECT * FROM users;")
      .then((res) => {
        client.release();
        return res.rows;
      })
      .catch((e) => {
        console.error(e.stack);
        client.release();
      });
  }

  async getUserByUsername({ username }: { username: string }) {
    return { username };
  }
}

export default UserAPI;
