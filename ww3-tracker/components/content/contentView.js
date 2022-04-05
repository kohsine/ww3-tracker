import { Card, CardActions, CardContent, CardMedia, Typography, IconButton, ButtonGroup, Stack, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { BiUpvote, BiDownvote } from 'react-icons/bi'
import { Box } from '@mui/system';


export default function ContentView(props) {
    const [preview, setPreview] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [vote, setVote] = useState(0); // 0 = no vote, 1 = upvote, -1 = downvote

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
            setPreview(data.preview);
            setIsLoading(false);
            // TODO check if user has voted on this post
        }
    }, [data]);

    useEffect(() => {
        setIsLoading(true);
    }, [props.post]);

    function upvote() {
        // TODO
    }

    function downvote() {
        // todo
    }

    return (
        <Card style={{ height: '100%', margin: '5px', width: '65vh' }}>
            {
                isLoading ?

                    <CardContent>
                        <Stack alignItems="center" justifyContent="center">
                            <CircularProgress />
                        </Stack>
                    </CardContent>
                    :

                    <CardMedia
                        component={'img'}
                        alt={'No preview available'}
                        height="50%"
                        src={preview.images?.length > 0 ? preview.images[0] : preview.url}
                        onClick={() => {
                            window.open(props.post.url, '_blank');
                        }}
                    />
            }
            <CardContent>
                <Stack direction={'row'} alignItems="center">
                    <ButtonGroup variant="outlined" orientation="vertical">
                        <IconButton onClick={upvote} disabled={!props.username} color={vote === 1 ? "inherit" : "default"}>
                            <BiUpvote />
                        </IconButton>
                        <Box style={{ textAlign: 'center' }}>
                            {/* TODO get vote count */}
                            <Typography variant="body2">{(props.post?.upvotes - props.post?.downvotes) || 0}</Typography>
                        </Box>
                        <IconButton onClick={downvote} disabled={!props.username} color={vote === -1 ? "inherit" : "default"}>
                            <BiDownvote />
                        </IconButton>
                    </ButtonGroup>

                    <a href={props.post.url} style={{ textDecoration: 'none' }}>
                        <Typography gutterBottom variant="h5" >
                            {props.post.title}
                        </Typography>
                    </a>
                </Stack>
                <Typography variant="body2">
                    {props.post.description}
                </Typography>
            </CardContent>
        </Card>
    )
}