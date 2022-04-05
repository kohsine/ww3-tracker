import client from './client';

class CommentVoteAPI {

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
        try {
            const { rows } = await client.query(text, values);
            return rows[0].count;
        } catch (e) {
            console.error(e.stack);
        }
    }

    async getVoteById({ commentId, user }) {
        const text = 'SELECT * FROM comment_votes WHERE comment_id = $1 AND username = $2;';
        const values = [commentId, user];
        try {
            const { rows } = await client.query(text, values);
            if (rows.length == 0) return null;
            const vote = this.voteReducer(rows[0]);
            return vote;
        } catch (e) {
            console.error(e.stack);
        }
    }

    async submitCommentVote(args) {
        console.log("username " + args.user);
    
        const text = 'INSERT INTO comment_votes(username, comment_id, vote) VALUES($1, $2, $3) RETURNING *';
        const values = [args.user, args.commentId, args.vote];
    
        try {
            const res = await client.query(text, values);
            const vote = this.voteReducer(res.rows[0]);
            return { success: true, message: "ok", commentVoteId: vote.id };
        } catch (e) {
            console.error(e.stack);
            return { success: false, message: "Internal server error." };
        }
    }
  
}

export default CommentVoteAPI;