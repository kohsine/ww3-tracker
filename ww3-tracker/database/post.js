const { Pool, Client } = require('pg')
import { pg_config } from './connect'

class PostAPI {

  postReducer(post) {
    return {
      id: post.id,
      title: post.title,
      description: post.description,
      lon: post.lon,
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
      console.log("rows " + JSON.stringify(res.rows));
      return Promise.all(
        res.rows.map(post => this.postReducer(post)),
      );
    } catch (e) {
      console.error(e.stack)
    } finally {
      client.end()
    }
  }
}

export default PostAPI;