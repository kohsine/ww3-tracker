const { Pool, Client } = require('pg')
import { pg_config } from './connect'

class PostAPI {

  postReducer(post) {
    return {
      id: post.id,
      title: post.title,
      description: post.description,
      lng: post.lng,
      lat: post.lat,
      url: post.url,
      author: {
        username: post.username
      }
    };
  }

  async getAllPosts() {
    const client = new Client(pg_config)
    client.connect()
    try {
      const res = await client.query('SELECT * FROM posts, users WHERE username = author;')
      return Promise.all(
        res.rows.map(post => this.postReducer(post)),
      );
    } catch (e) {
      console.error(e.stack)
    } finally {
      client.end()
    }
  }

  async submitPost({ title, description, lng, lat, url, user }) {
    console.log("username " + user);
    console.log("title " + title);

    const text = 'INSERT INTO posts(title, description, lng, lat, author, url) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [title, description, lng, lat, user, url];

    const client = new Client(pg_config);
    client.connect();
    try {
      const res = await client.query(text, values);
      console.log("rows " + JSON.stringify(res.rows));
      const post = this.postReducer(res.rows[0]);
      return { success: true, message: "ok", postId: post.id };
    } catch (e) {
      console.error(e.stack);
      return {success: false, message: "Internal server error."};
    } finally {
      client.end();
    }
  }
}

export default PostAPI;