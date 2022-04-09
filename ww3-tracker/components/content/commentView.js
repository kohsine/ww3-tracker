import { Card, CardActions, CardContent, CardMedia, Typography, IconButton, ButtonGroup, Stack, CircularProgress, Pagination, TextField, Button, List, ListItem } from '@mui/material'
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
    query($postId: ID!, $pageSize: Int!, $offset: Int!) {
        post(id: $postId) {
          comments(pageSize: $pageSize, offset: $offset) {
            id
            content
            author {
              username
            }
            date
            upvotes
            downvotes
          }
            numOfComments
        }
      }
      
`

export default function CommentView(props) {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [page, setPage] = useState(0);
    const [numPages, setNumPages] = useState(1);

    const [submitComment, { loading, data, error }] = useMutation(SUBMIT_COMMENT, { variables: { postId: props.post?.id, content: comment } });
    const { data: commentData, loading: commentLoading, error: commentError, refetch } = useQuery(GET_COMMENTS, { variables: { postId: props.post?.id, pageSize: 10, offset: page * 10 } });

    function addComment() {
        submitComment().then((r) => {
            setComment('');
        });
        refetch();
    }

    useEffect(() => {
        setPage(0);
    }, [props.post]);

    useEffect(() => {
        if (commentData) {
            setComments(commentData.post.comments);
            setNumPages(Math.ceil(commentData.post.numOfComments / 10));
        }
    }, [commentData]);

    function renderComment(comment) {

        return (
            <ListItem key={comment.id}>
                <Stack direction={'row'} alignItems="center">
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
            </ListItem>
        )
    }

    return (
        <Card style={{ height: '100%', margin: '5px', width: '65vh' }}>
            <CardContent>
                <Typography variant="h6">
                    Comments
                </Typography>
                <Stack direction={'column'} spacing={1} style={{ marginTop: '5px' }}>
                    <List sx={{ overflow: 'auto', maxHeight: '350px' }}>
                        {
                            comments.map(comment => {
                                return renderComment(comment);
                            })
                        }
                    </List>
                    <TextField disabled={loading} label="Add comment" variant="outlined" fullWidth multiline maxRows={4} value={comment} onChange={e => { setComment(e.target.value) }} />
                    <Button onClick={addComment} disabled={loading}>
                        Post
                    </Button>
                </Stack>
            </CardContent>
            <CardActions>
                <Pagination
                    page={page + 1}
                    count={numPages}
                    onChange={(e, newPage) => {
                        setPage(newPage - 1);
                        refetch();
                    }}
                />
            </CardActions>
        </Card>
    )
}