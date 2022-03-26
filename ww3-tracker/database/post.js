import client from './client';

class PostAPI {

  postReducer(post) {
    return {
      id: post.id,
      title: post.title,
      description: post.description,
      lng: post.lng,
      lat: post.lat,
      url: post.url,
      author: post.author
    };
  }

  async getAllPosts() {
    try {
      const res = await client.query('SELECT * FROM posts, users WHERE username = author;')
      return Promise.all(
        res.rows.map(post => this.postReducer(post)),
      );
    } catch (e) {
      console.error(e.stack)
    }
  }

  async getPostById({ postId }) {
    const text = 'SELECT * FROM posts WHERE id = $1;';
    const values = [postId];
    try {
      const res = await client.query(text, values);
      return this.postReducer(res.rows[0]);
    } catch (e) {
      console.error(e.stack)
    }
  }

  async submitPost(args) {
    console.log("username " + args.user);

    const text = 'INSERT INTO posts(title, description, lng, lat, author, url) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [args.title, args.description, args.lng, args.lat, args.user, args.url];

    try {
      const res = await client.query(text, values);
      console.log("res " + JSON.stringify(res));
      const post = this.postReducer(res.rows[0]);
      return { success: true, message: "ok", postId: post.id };
    } catch (e) {
      console.error(e.stack);
      return {success: false, message: "Internal server error."};
    }
  }
}

export default PostAPI;