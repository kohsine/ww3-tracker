import { DataSource } from "apollo-datasource";
import { getClient } from "./client";

class PostVoteAPI extends DataSource {
  voteReducer(vote: { id: any; username: any; post_id: any; vote: any }) {
    return {
      id: vote.id,
      username: vote.username,
      postId: vote.post_id,
      vote: vote.vote,
    };
  }

  async getVoteCountByPost({
    postId,
    voteType,
  }: {
    postId: any;
    voteType: any;
  }) {
    const text =
      "SELECT COUNT(*) FROM post_votes WHERE post_id = $1 AND vote = $2;";
    const values = [postId, voteType];
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

  async getVoteById({ postId, user }: { postId: any; user: any }) {
    const text =
      "SELECT * FROM post_votes WHERE post_id = $1 AND username = $2;";
    const values = [postId, user];
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

  async submitPostVote(args: { user: any; postId: any; vote: any }) {
    const text =
      "INSERT INTO post_votes(username, post_id, vote) VALUES($1, $2, $3) RETURNING *";
    const values = [args.user, args.postId, args.vote];
    const client = await getClient();

    try {
      const res = await client.query(text, values);
      client.release();
      const vote = this.voteReducer(res.rows[0]);
      return { success: true, message: "ok", postVoteId: vote.id };
    } catch (e) {
      console.error(e.stack);
      client.release();
      return { success: false, message: "Internal server error." };
    }
  }

  async deletePostVote(args: { user: any; postId: any }) {
    const text = "DELETE FROM post_votes WHERE username = $1 AND post_id = $2;";
    const values = [args.user, args.postId];
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

export default PostVoteAPI;
