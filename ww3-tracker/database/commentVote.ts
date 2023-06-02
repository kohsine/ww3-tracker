import { DataSource } from "apollo-datasource";
import { getClient } from "./client";

class CommentVoteAPI extends DataSource {
  voteReducer(vote: { id: any; username: any; comment_id: any; vote: any }) {
    return {
      id: vote.id,
      username: vote.username,
      commentId: vote.comment_id,
      vote: vote.vote,
    };
  }

  async getVoteCountByComment({
    commentId,
    voteType,
  }: {
    commentId: any;
    voteType: any;
  }) {
    const text =
      "SELECT COUNT(*) FROM comment_votes WHERE comment_id = $1 AND vote = $2;";
    const values = [commentId, voteType];
    const client = await getClient();
    try {
      const { rows } = await client.query(text, values);
      client.release();
      return rows[0].count;
    } catch (e) {
      client.release();
      console.error(e.stack);
    }
  }

  async getVoteById({ commentId, user }: { commentId: any; user: any }) {
    const text =
      "SELECT * FROM comment_votes WHERE comment_id = $1 AND username = $2;";
    const values = [commentId, user];
    const client = await getClient();
    try {
      const { rows } = await client.query(text, values);
      client.release();
      if (rows.length == 0) return null;
      const vote = this.voteReducer(rows[0]);
      return vote;
    } catch (e) {
      console.error(e.stack);
      client.release();
      return null;
    }
  }

  async submitCommentVote(args: { user: any; commentId: any; vote: any }) {
    const text =
      "INSERT INTO comment_votes(username, comment_id, vote) VALUES($1, $2, $3) RETURNING *";
    const values = [args.user, args.commentId, args.vote];
    const client = await getClient();

    try {
      const res = await client.query(text, values);
      client.release();
      const vote = this.voteReducer(res.rows[0]);
      return { success: true, message: "ok", commentVoteId: vote.id };
    } catch (e) {
      console.error(e.stack);
      client.release();
      return { success: false, message: "Internal server error." };
    }
  }

  async deleteCommentVote(args: { user: any; commentId: any }) {
    const text =
      "DELETE FROM comment_votes WHERE username = $1 AND comment_id = $2;";
    const values = [args.user, args.commentId];
    const client = await getClient();

    try {
      await client.query(text, values);
      client.release();
      return { success: true, message: "ok" };
    } catch (e) {
      console.error(e.stack);
      client.release();
      return { success: false, message: "Internal server error." };
    }
  }
}

export default CommentVoteAPI;
