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

const GET_COMMENTS = gql`
    query($postId: ID!) {
        post(id: $postId) {
          comments {
            id
            content
            author {
              username
            }
            date
            upvotes
            downvotes
          }
        }
      }
      
`

// const SUBMIT_COMMENT_VOTE = gql`
//     mutation($commentId: ID!, $vote: String!) {
//         submitCommentVote(commentId: $commentId, vote: $vote) {
//             success
//             message
//             commentVoteId
//         }
//     }
//     `

export default function CommentView(props) {
    // const [vote, setVote] = useState(0); // 0 = no vote, 1 = upvote, -1 = downvote
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    // useEffect(() => {
    //     if (props.post.comments !== comments) 
    //         setComments(props.post.comments);
    // }, [props.post.comments]);

    // useEffect(() => {
    //     const post = props.data.posts.find(p => p.id === props.post.id);
    //     console.log('ajdsfkljadskl', post)
    //     if (post) {
    //         setComments(post.comments);
    //     }
    // }, [props.data]);



    const [submitComment, { loading, data, error }] = useMutation(SUBMIT_COMMENT, { variables: { postId: props.post?.id, content: comment } });
    const { data: commentData, loading: commentLoading, error: commentError, refetch } = useQuery(GET_COMMENTS, { variables: { postId: props.post?.id } });

    function addComment() {
        submitComment().then((r) => {
            setComment('');
        });
        refetch();
    }

    useEffect(() => {
        if (commentData) {
            setComments(commentData.post.comments);
        }
    }, [commentData]);

    useEffect(() => {
        console.log(loading, data, error)
    }, [loading, data, error]);

    // useEffect(() => {
    //     console.log(props.post)
    // }, [props.post]);

    // const [submitCommentVote, {loading: loadingVote}] = useMutation(SUBMIT_COMMENT_VOTE, { variables: { commentId: props.comment?.id, vote: vote === 1 ? 'up' : 'down' } });

    // function upvote() {
    //     setVote(1);
    //     submitCommentVote();
    // }

    // function downvote() {
    //     setVote(-1);
    //     submitCommentVote();
    // }
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
                        comments.map(comment => {
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