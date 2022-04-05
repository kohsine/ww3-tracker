import client from './client';

class PostVoteAPI {

    voteReducer(vote) {
        return {
            id: vote.id,
            username: vote.username,
            postId: vote.post_id,
            vote: vote.vote
        };
    }

    async getVoteCountByPost({ postId, voteType }) {
        const text = 'SELECT COUNT(*) FROM post_votes WHERE post_id = $1 AND vote = $2;';
        const values = [postId, voteType];
        try {
            const { rows } = await client.query(text, values);
            return rows[0].count;
        } catch (e) {
            console.error(e.stack);
        }
    }

    async getVoteById({ postId, user }) {
        const text = 'SELECT * FROM post_votes WHERE post_id = $1 AND username = $2;';
        const values = [postId, user];
        try {
            const { rows } = await client.query(text, values);
            if (rows.length == 0) return null;
            const vote = this.voteReducer(rows[0]);
            return vote;
        } catch (e) {
            console.error(e.stack);
        }
    }

    async submitPostVote(args) {
        console.log("username " + args.user);
    
        const text = 'INSERT INTO post_votes(username, post_id, vote) VALUES($1, $2, $3) RETURNING *';
        const values = [args.user, args.postId, args.vote];
    
        try {
            const res = await client.query(text, values);
            const vote = this.voteReducer(res.rows[0]);
            return { success: true, message: "ok", postVoteId: vote.id };
        } catch (e) {
            console.error(e.stack);
            return { success: false, message: "Internal server error." };
        }
      }
  
}

export default PostVoteAPI;