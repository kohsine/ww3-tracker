const { Pool, Client } = require('pg')
import { pg_config } from './connect'

class CommentAPI {

  commentReducer(comment) {
    return {
      id: comment.id,
      content: comment.content,
      author: comment.author,
      postId: comment.postid,
      date: comment.created_date
    };
  }

  async getAllComments() {
    const client = new Client(pg_config)
    client.connect()
    try {
      const res = await client.query('SELECT * FROM comments;')
      return Promise.all(
        res.rows.map(comment => this.commentReducer(comment)),
      );
    } catch (e) {
      console.error(e.stack)
    } finally {
      client.end()
    }
  }

  async getCommentsByPostId({ postId }) {
    const text = 'SELECT * FROM comments WHERE postId = $1;';
    const values = [postId];
    const client = new Client(pg_config)
    client.connect()
    try {
      const res = await client.query(text, values);
      return Promise.all(
        res.rows.map(comment => this.commentReducer(comment)),
      );
    } catch (e) {
      console.error(e.stack)
    } finally {
      client.end()
    }
  }

  async submitComment(args) {
    console.log("username " + args.user);

    const text = 'INSERT INTO comments(content, author, postId) VALUES($1, $2, $3) RETURNING *';
    const values = [args.content, args.user, args.postId];

    const client = new Client(pg_config);
    client.connect();
    try {
      const res = await client.query(text, values);
      console.log("res " + JSON.stringify(res));
      const comment = this.commentReducer(res.rows[0]);
      return { success: true, message: "ok", commentId: comment.id };
    } catch (e) {
      console.error(e.stack);
      return { success: false, message: "Internal server error." };
    } finally {
      client.end();
    }
  }
}

export default CommentAPI;