import { Card, CardActions, CardContent, CardMedia, Typography, IconButton, ButtonGroup, Stack, CircularProgress, Pagination, TextField, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { BiUpvote, BiDownvote } from 'react-icons/bi'
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai'
import { Box } from '@mui/system';

const SUBMIT_COMMENT = gql`
    mutation($postId: ID!, $content: String!) {
        submitComment(postId: $postId, content: $content) {
            success
            message
            commentId
        }
    }
    `

const SUBMIT_COMMENT_VOTE = gql`
    mutation($commentId: ID!, $vote: String!) {
        submitCommentVote(commentId: $commentId, vote: $vote) {
            success
            message
            commentVoteId
        }
    }
    `

export default function CommentView(props) {
    // const [vote, setVote] = useState(0); // 0 = no vote, 1 = upvote, -1 = downvote
    const [comment, setComment] = useState('');

    const [submitComment, { loading }] = useMutation(SUBMIT_COMMENT, { variables: { postId: props.post?.id, content: comment } });
    // const [submitCommentVote, {loading: loadingVote}] = useMutation(SUBMIT_COMMENT_VOTE, { variables: { commentId: props.comment?.id, vote: vote === 1 ? 'up' : 'down' } });

    // function upvote() {
    //     setVote(1);
    //     submitCommentVote();
    // }

    // function downvote() {
    //     setVote(-1);
    //     submitCommentVote();
    // }

    function addComment() {
        submitComment().then((r) => {
            setComment('');
        });
        props.refetch();
    }

    // useEffect(() => {
    //     console.log(props.post)
    // }, [props.post]);

    function renderComment(comment) {

        return (
            <Stack direction={'row'} alignItems="center" key={comment.id}>
                {/* <ButtonGroup variant="outlined" orientation="vertical">
                    <IconButton onClick={upvote} disabled={!props.username} >
                        <AiOutlineCaretUp />
                    </IconButton>
                    <Box style={{ textAlign: 'center' }}>
                        <Typography variant="body2">{(comment.upvotes - comment.downvotes) || 0}</Typography>
                    </Box>
                    <IconButton onClick={downvote} disabled={!props.username} >
                        <AiOutlineCaretDown />
                    </IconButton>
                </ButtonGroup> */}
                <Stack>
                    <Stack direction="row" spacing={1}>
                        <Typography variant="caption" color="textSecondary" component="p">
                            {(new Date(parseInt(comment.date))).toLocaleDateString()}
                        </Typography>
                        <Typography variant="caption" component="p">
                            {comment.author.username}
                        </Typography>
                    </Stack>
                    <Typography variant="body2">
                        {comment.content}
                    </Typography>
                </Stack>
            </Stack>
        )
    }

    return (
        <Card style={{ height: '100%', margin: '5px', width: '65vh' }}>
            <CardContent>
                <Typography variant="h6">
                    Comments
                </Typography>
                <Stack direction={'column'} spacing={1} style={{ marginTop: '5px' }}>
                    {
                        props.post.comments?.map(comment => {
                            return renderComment(comment);
                        })
                    }
                    <TextField disabled={loading} label="Add comment" variant="outlined" fullWidth multiline maxRows={4} value={comment} onChange={e => { setComment(e.target.value) }} />
                    <Button onClick={addComment} disabled={loading}>
                        Post
                    </Button>
                </Stack>
            </CardContent>
            <CardActions>

                <Pagination />
            </CardActions>
        </Card>
    )
}