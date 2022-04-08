import { Card, CardActions, CardContent, CardMedia, Typography, IconButton, ButtonGroup, Stack, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import { BiUpvote, BiDownvote } from 'react-icons/bi'
import { Box } from '@mui/system';

const QUERY = gql`
    query($url: String!, $postId: ID!) {
        preview(url: $url) {
            url
            title
            images
            mediaType
            contentType
            favicons
        },
        postVote(id: $postId) {
            vote
        }
    }
`
const MUTATION = gql`
    mutation($postId: ID!, $vote: String!) {
        submitPostVote(postId: $postId, vote: $vote) {
            success
            message
            postVoteId
        }
    }
`
export default function ContentView(props) {
    const [preview, setPreview] = useState({});
    const [vote, setVote] = useState(0); // 0 = no vote, 1 = upvote, -1 = downvote

    const { loading, error, data, refetch } = useQuery(QUERY, { variables: { url: props.post?.url, postId: props.post?.id } });
    const [sendDown] = useMutation(MUTATION, { variables: { postId: props.post?.id, vote: 'down' } });

    useEffect(() => {
        if (data) {
            setPreview(data.preview);
            if (data.postVote) {
                setVote(data.postVote.vote === 'up' ? 1 : -1);
            } else {
                setVote(0);
            }
        }
    }, [data]);

    useEffect(() => {
        setVote(0);
    }, [loading]);

    useEffect(() => {
        refetch();
    }, [props.post]);

    const [sendUp] = useMutation(MUTATION, { variables: { postId: props.post?.id, vote: 'up' } });
    function upvote() {

        if (vote) return;
        sendUp();
        setVote(1);
    }

    function downvote() {
        if (vote) return;
        sendDown();
        setVote(-1);
    }

    return (
        <Card style={{ height: '100%', margin: '5px', width: '65vh' }}>
            {
                loading ?

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
                            <Typography variant="body2">{(props.post?.upvotes - props.post?.downvotes) || 0 + vote}</Typography>
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