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
      media_type: post.media_type,
      content_type: post.content_type,
      favicon: post.favicon,
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

  async submitPost(args) {
    console.log("username " + args.user);

    const text = 'INSERT INTO posts(title, description, lng, lat, author, url, media_type, content_type, favicon) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
    const values = [args.title, args.description, args.lng, args.lat, args.user, args.url, args.media_type, args.content_type, args.favicon];
    ;

    const client = new Client(pg_config);
    client.connect();
    try {
      const res = await client.query(text, values);
      console.log("res " + JSON.stringify(res));
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