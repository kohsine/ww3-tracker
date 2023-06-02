import { DataSource } from "apollo-datasource";
import { getClient } from "./client";

class CommentAPI extends DataSource {
  commentReducer(comment: {
    id: any;
    content: any;
    author: any;
    postid: any;
    created_date: any;
  }) {
    return {
      id: comment.id,
      content: comment.content,
      author: comment.author,
      postId: comment.postid,
      date: comment.created_date,
    };
  }

  async getAllComments() {
    const client = await getClient();
    try {
      const res = await client.query("SELECT * FROM comments;");
      client.release();
      return Promise.all(
        res.rows.map((comment) => this.commentReducer(comment))
      );
    } catch (e) {
      console.error(e.stack);
      client.release();
      return [];
    }
  }

  async getCommentById({ commentId }: { commentId: string }) {
    const text = "SELECT * FROM comments WHERE id = $1;";
    const values = [commentId];
    const client = await getClient();
    try {
      const { rows } = await client.query(text, values);
      client.release();
      if (rows.length == 0) return null;
      return this.commentReducer(rows[0]);
    } catch (e) {
      console.error(e.stack);
      client.release();
      return null;
    }
  }

  async getCommentsByPostId(args: { postId: any; pageSize: any; offset: any }) {
    const text =
      "SELECT * FROM comments WHERE postId = $1 ORDER BY created_date DESC LIMIT $2 OFFSET $3;";
    const values = [args.postId, args.pageSize, args.offset];
    const client = await getClient();
    try {
      const res = await client.query(text, values);
      client.release();
      return Promise.all(
        res.rows.map((comment) => this.commentReducer(comment))
      );
    } catch (e) {
      console.error(e.stack);
      client.release();
      return [];
    }
  }

  async getNumOfCommentsByPostId(args: { postId: any }) {
    const text = "SELECT COUNT(*) FROM comments WHERE postId = $1;";
    const values = [args.postId];
    const client = await getClient();
    try {
      const { rows } = await client.query(text, values);
      client.release();
      return rows[0].count;
    } catch (e) {
      console.error(e.stack);
      client.release();
    }
  }

  async submitComment(args: { user: string; content: any; postId: any }) {
    console.log("username " + args.user);

    const text =
      "INSERT INTO comments(content, author, postId) VALUES($1, $2, $3) RETURNING *";
    const values = [args.content, args.user, args.postId];
    const client = await getClient();

    try {
      const res = await client.query(text, values);
      client.release();
      const comment = this.commentReducer(res.rows[0]);
      return { success: true, message: "ok", commentId: comment.id };
    } catch (e) {
      client.release();
      console.error(e.stack);
      return { success: false, message: "Internal server error." };
    }
  }
}

export default CommentAPI;
