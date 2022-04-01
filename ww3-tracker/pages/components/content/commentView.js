import { Card, CardActions, CardContent, CardMedia, Typography, IconButton, ButtonGroup, Stack, CircularProgress, Pagination } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { BiUpvote, BiDownvote } from 'react-icons/bi'
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai'
import { Box } from '@mui/system';


export default function CommentView(props) {
    const [isLoading, setIsLoading] = useState(true);

    const QUERY = gql`
            query($url: String!) {
                preview(url: $url) {
                    url
                    title
                    images
                    mediaType
                    contentType
                    favicons
                }
            }
        `
    const { loading, error, data } = useQuery(QUERY, { variables: { url: props.post?.url } });

    useEffect(() => {
        if (data) {
            setIsLoading(false);
        }
    }, [data]);

    useEffect(() => {
        setIsLoading(true);
    }, [props.post]);

    function renderComment(comment) {

        return (
            <Stack direction={'row'} alignItems="center">
                <ButtonGroup variant="outlined" orientation="vertical">
                    <IconButton onClick={null}>
                        <AiOutlineCaretUp />
                    </IconButton>
                    <Box style={{ textAlign: 'center' }}>
                        <Typography variant="body2">{(comment.upvotes - comment.downvotes) || 0}</Typography>
                    </Box>
                    <IconButton onClick={null}>
                        <AiOutlineCaretDown />
                    </IconButton>
                </ButtonGroup>
                <Stack>
                    <Stack direction="row" spacing={1}>
                        <Typography variant="caption" color="textSecondary" component="p">
                            {(new Date(comment.date)).toLocaleDateString()}
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
                {
                    renderComment({
                        id: '1',
                        content: 'adlksfjlkasdjl afdsjlk fjadsjfdsa jlkfdsaj  fads fads fadsfd af ad fadsk',
                        author: {
                            username: 'joe'
                        },
                        post: {
                            id: '1',
                        },
                        date: Date.now(),
                        upvotes: 12,
                        downvotes: 3
                    })
                }
            </CardContent>
            <CardActions>

                <Pagination />
            </CardActions>
        </Card>
    )
}