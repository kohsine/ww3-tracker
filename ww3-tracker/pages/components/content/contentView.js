import { Card, CardActions, CardContent, CardMedia, Typography, IconButton, ButtonGroup, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { BiUpvote, BiDownvote } from 'react-icons/bi'




export default function ContentView(props) {
    const [preview, setPreview] = useState({});

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
        }
    }, [data]);

    return (
        <Card style={{ height: '100%', margin: '5px', width: '65vh'}}>
            <CardMedia
                component={'img'}
                alt={'No preview available'}
                height="35%"
                src={preview.images?.length > 0 ? preview.images[0] : preview.url}
                onClick={() => {
                    window.open(props.post.url, '_blank');
                }}
            />
            <CardContent>
                <Stack direction={'row'} alignItems="center">
                    <ButtonGroup variant="outlined" orientation="vertical">
                        <IconButton>
                            <BiUpvote />
                        </IconButton>
                        <IconButton>
                            <BiDownvote />
                        </IconButton>
                    </ButtonGroup>

                    <a href={props.post.url} target="_blank" style={{ textDecoration: 'none' }}>
                        <Typography gutterBottom variant="h5" >
                            {props.post.title}
                        </Typography>
                    </a>
                </Stack>
                <Typography variant="body2">
                    {props.post.description}
                </Typography>
            </CardContent>
            <CardActions>

            </CardActions>
        </Card>
    )
}