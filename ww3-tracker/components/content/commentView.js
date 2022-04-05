import { Card, CardActions, CardContent, CardMedia, Typography, IconButton, ButtonGroup, Stack, CircularProgress, Pagination } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { BiUpvote, BiDownvote } from 'react-icons/bi'
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai'
import { Box } from '@mui/system';


export default function CommentView(props) {
    const [vote, setVote] = useState(0); // 0 = no vote, 1 = upvote, -1 = downvote

    function upvote() {
        // TODO
    }

    function downvote() {
        // todo
    }

    function renderComment(comment) {

        return (
            <Stack direction={'row'} alignItems="center">
                <ButtonGroup variant="outlined" orientation="vertical">
                    <IconButton onClick={upvote} disabled={!props.username} >
                        <AiOutlineCaretUp />
                    </IconButton>
                    <Box style={{ textAlign: 'center' }}>
                        <Typography variant="body2">{(comment.upvotes - comment.downvotes) || 0}</Typography>
                    </Box>
                    <IconButton onClick={downvote} disabled={!props.username} >
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
                    props.post.comments?.map(comment => {
                        return renderComment(comment);
                    })
                }
            </CardContent>
            <CardActions>

                <Pagination />
            </CardActions>
        </Card>
    )
}