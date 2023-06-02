import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  ButtonGroup,
  Stack,
  CircularProgress,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { gql } from "../../types/__generated_graphql__/gql";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import Comments from "./Comments";

const QUERY = gql(`
  query getPostData($url: String!, $postId: ID!) {
    preview(url: $url) {
      url
      title
      images
      mediaType
      contentType
      favicons
    }
    postVote(id: $postId) {
      vote
    }
  }
`);
const MUTATION = gql(`
  mutation submitPostVote($postId: ID!, $vote: String!) {
    submitPostVote(postId: $postId, vote: $vote) {
      success
      message
      postVoteId
    }
  }
`);

const DELETE_VOTE = gql(`
  mutation deletePostVote($postId: ID!) {
    deletePostVote(postId: $postId) {
      success
      message
    }
  }
`);

interface Preview {
  images?: any;
  url?: any;
}

export default function Content({ post, username, refetch: refetchPost }: any) {
  const [preview, setPreview] = useState<Preview>({});
  const [vote, setVote] = useState(0); // 0 = no vote, 1 = upvote, -1 = downvote
  const [totalVote, setTotalVote] = useState(0);

  const { loading, error, data, refetch } = useQuery(QUERY, {
    variables: { url: post.url, postId: post?.id },
  });
  const [sendUp] = useMutation(MUTATION, {
    variables: { postId: post.id, vote: "up" },
  });
  const [sendDown] = useMutation(MUTATION, {
    variables: { postId: post.id, vote: "down" },
  });
  const [deleteVote] = useMutation(DELETE_VOTE, {
    variables: { postId: post.id },
  });

  useEffect(() => {
    if (data) {
      setPreview(data.preview);
      if (data.postVote) {
        if (data.postVote.vote === "up") {
          setVote(1);
        } else if (data.postVote.vote === "down") {
          setVote(-1);
        }
      } else {
        setVote(0);
      }
    }
  }, [data]);

  useEffect(() => {
    setTotalVote(post.upvotes - post.downvotes);
    refetch();
  }, [post]);

  function upvote() {
    if (vote === 1) {
      deleteVote().then(() => {
        setVote(0);
      });
      setTotalVote(totalVote - 1);
    } else if (vote === -1) {
      deleteVote().then(() => {
        sendUp().then(() => {
          setVote(1);
        });
      });
      setTotalVote(totalVote + 2);
    } else {
      sendUp().then(() => {
        setVote(1);
      });
      setTotalVote(totalVote + 1);
    }
  }

  function downvote() {
    if (vote === -1) {
      deleteVote().then(() => {
        setVote(0);
      });
      setTotalVote(totalVote + 1);
    } else if (vote === 1) {
      deleteVote().then(() => {
        sendDown().then(() => {
          setVote(-1);
        });
      });
      setTotalVote(totalVote - 2);
    } else {
      sendDown().then(() => {
        setVote(-1);
      });
      setTotalVote(totalVote - 1);
    }
  }

  return (
    <Box
      style={{
        height: "100%",
        margin: "5px",
        width: "65vw",
        overflowY: "auto",
        borderRadius: "20px",
      }}
    >
      <Card style={{ minHeight: "100%" }}>
        {loading || data == null ? (
          <CardContent>
            <Stack alignItems="center" justifyContent="center">
              <CircularProgress />
            </Stack>
          </CardContent>
        ) : (
          <CardMedia
            component={"img"}
            height="50%"
            src={
              data.preview.images != null && data.preview.images.length > 0
                ? data.preview.images[0] ?? ""
                : data.preview.url
            }
            onClick={() => {
              window.open(post.url, "_blank");
            }}
          />
        )}
        <CardContent>
          <Stack direction={"row"} alignItems="center">
            <ButtonGroup variant="outlined" orientation="vertical">
              <IconButton
                onClick={upvote}
                disabled={username == null}
                color={vote === 1 ? "inherit" : "default"}
              >
                <BiUpvote />
              </IconButton>
              <Box style={{ textAlign: "center" }}>
                <Typography variant="body2">{totalVote}</Typography>
              </Box>
              <IconButton
                onClick={downvote}
                disabled={username == null}
                color={vote === -1 ? "inherit" : "default"}
              >
                <BiDownvote />
              </IconButton>
            </ButtonGroup>

            <a href={post.url} style={{ textDecoration: "none" }}>
              <Typography gutterBottom variant="h5">
                {post.title}
              </Typography>
            </a>
          </Stack>
          <Typography variant="body2">{post.description}</Typography>
          <Comments post={post} username={username} />
        </CardContent>
      </Card>
    </Box>
  );
}
