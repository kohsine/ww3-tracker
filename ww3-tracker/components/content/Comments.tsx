import {
  Typography,
  Stack,
  Pagination,
  TextField,
  Button,
  List,
  ListItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMutation, useLazyQuery } from "@apollo/client";
import { gql } from "../../types/__generated_graphql__/gql";

const SUBMIT_COMMENT = gql(`
  mutation submitComment($postId: ID!, $content: String!) {
    submitComment(postId: $postId, content: $content) {
      success
      message
      commentId
    }
  }
`);

const GET_COMMENTS = gql(`
  query getComments($postId: ID!, $pageSize: Int!, $offset: Int!) {
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
`);

interface Props {
  post: any;
  username: string;
}

export default function Comments({ post, username }: Props) {
  const [comment, setComment] = useState("");
  const [page, setPage] = useState(0);
  const [submitComment, { loading, data, error }] = useMutation(
    SUBMIT_COMMENT,
    { variables: { postId: post?.id, content: comment } }
  );
  const [
    getComments,
    {
      data: commentData,
      loading: commentLoading,
      error: commentError,
      refetch,
    },
  ] = useLazyQuery(GET_COMMENTS);

  function addComment() {
    submitComment().then((r) => {
      setComment("");
    });
    refetch();
  }

  useEffect(() => {
    setPage(0);
    if (post != null) {
      getComments({
        variables: { postId: post.id, pageSize: 50, offset: 0 },
      });
    }
  }, [post]);

  function renderComment(comment) {
    return (
      <ListItem key={comment.id}>
        <Stack direction={"row"} alignItems="center">
          <Stack>
            <Stack direction="row" spacing={1}>
              <Typography variant="caption" color="textSecondary" component="p">
                {new Date(parseInt(comment.date)).toLocaleDateString()}
              </Typography>
              <Typography variant="caption" component="p">
                {comment.author.username}
              </Typography>
            </Stack>
            <Typography variant="body2">{comment.content}</Typography>
          </Stack>
        </Stack>
      </ListItem>
    );
  }

  return (commentData?.post?.numOfComments ?? 0) === 0 && username === "" ? (
    <></>
  ) : (
    <>
      <Typography variant="h6">Comments</Typography>
      <Stack direction={"column"} spacing={1} style={{ marginTop: "5px" }}>
        <List sx={{ overflow: "auto", maxHeight: "350px" }}>
          {commentData?.post?.comments.map((comment) => {
            return renderComment(comment);
          })}
        </List>
        {username !== "" && (
          <>
            <TextField
              disabled={loading}
              label="Add comment"
              variant="outlined"
              fullWidth
              multiline
              maxRows={4}
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <Button onClick={addComment} disabled={loading}>
              Post
            </Button>
          </>
        )}
      </Stack>
    </>
  );
}
