const { Pool, Client } = require('pg')
import { pg_config } from './connect'

class VoteAPI {

    voteReducer(vote) {
        return {
            id: vote.id,
            username: vote.username,
            commentId: vote.comment_id,
            vote: vote.vote
        };
    }

    async getVoteCountByComment({ commentId, voteType }) {
        const text = 'SELECT COUNT(*) FROM comment_votes WHERE comment_id = $1 AND vote = $2;';
        const values = [commentId, voteType];
        const client = new Client(pg_config);
        client.connect();
        try {
            const { rows } = await client.query(text, values);
            return rows[0].count;
        } catch (e) {
            console.error(e.stack);
        } finally {
            client.end();
        }
    }

    async submitCommentVote(args) {
        console.log("username " + args.user);
    
        const text = 'INSERT INTO comment_votes(username, comment_id, vote) VALUES($1, $2, $3) RETURNING *';
        const values = [args.user, args.commentId, args.vote];
    
        const client = new Client(pg_config);
        client.connect();
        try {
            const res = await client.query(text, values);
            const vote = this.voteReducer(res.rows[0]);
            return { success: true, message: "ok", commentVoteId: vote.id };
        } catch (e) {
            console.error(e.stack);
            return { success: false, message: "Internal server error." };
        } finally {
            client.end();
        }
      }
  
}

export default VoteAPI;