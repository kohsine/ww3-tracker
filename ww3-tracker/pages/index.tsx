import { Box, Container, Stack, Button } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getCookie, removeCookies } from "cookies-next";
import SubmitContent from "../components/content/Submit";
import Map from "../components/map/Map";
import { useQuery } from "@apollo/client";
import { gql } from "../types/__generated_graphql__/gql";
import { Post } from "../types/__generated_graphql__/graphql";
import Content from "../components/content/Content";
import Comments from "../components/content/Comments";

// #191919
// #2D4263
// #C84B31
// #ECDBBA

const GET_POSTS = gql(`
  query getPosts {
    posts {
      id
      title
      description
      lng
      lat
      author {
        username
      }
      url
      upvotes
      downvotes
    }
  }
`);

export default function Index({ user }) {
  const [username, setUsername] = useState("");
  const [createIsOpen, setCreateIsOpen] = useState(false);
  const [selectedCoords, setSelectedCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [selectedPost, setSelectedPost] = useState<{
    [name: string]: any;
  } | null>(null);
  const [isPostVisible, setIsPostVisible] = useState("hidden");
  const [points, setPoints] = useState<any>([]);

  const { loading, error, data, refetch } = useQuery(GET_POSTS);

  useEffect(() => {
    const username = getCookie("username");
    if (username) {
      setUsername(username.toString());
      setIsPostVisible("visible");
    }
  }, []);

  useEffect(() => {
    if (data) {
      const posts = data.posts;
      const pts = posts.map((post) => ({
        properties: post,
        geometry: {
          type: "Point",
          coordinates: [post.lat, post.lng],
        },
      }));
      setPoints(pts);
    }
  }, [data]);

  const signoutHandler = () => {
    removeCookies("username");
    removeCookies("token");
    setUsername("");
  };

  const router = useRouter();

  return (
    <Box
      height="100vh"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      display="flex"
    >
      <Container maxWidth={false}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          style={{ backgroundColor: "" }}
        >
          <Stack
            spacing={2}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            marginBottom="20px"
            style={{ width: "100%" }}
          >
            <div></div>
            <h1 style={{ fontWeight: 200, color: "#ECDBBA" }}>
              World War III Tracker
            </h1>

            {username ? (
              <Stack direction="row" alignItems="baseline" spacing={4}>
                <h3 style={{ fontWeight: 200, color: "#ECDBBA" }}>
                  {username}
                </h3>
                <Button
                  size="small"
                  id="signout"
                  variant="outlined"
                  onClick={() => signoutHandler()}
                >
                  Signout
                </Button>
              </Stack>
            ) : (
              <Stack direction="row" alignItems="baseline" spacing={4}>
                <h3 style={{ fontWeight: 200, color: "#ECDBBA" }}>
                  STAND WITH UKRAINE
                </h3>

                <Button
                  size="small"
                  id="gotoLogin"
                  variant="outlined"
                  onClick={() => {
                    router.push("/auth/login");
                  }}
                >
                  Login
                </Button>
              </Stack>
            )}
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            width="100%"
            style={{}}
            height="70vh"
          >
            <Stack direction="column" width="100%" height="100%" spacing={1}>
              {username && selectedCoords != null ? (
                <Button
                  size="medium"
                  id="create"
                  sx={{ visibility: isPostVisible }}
                  variant="outlined"
                  onClick={() => {
                    setCreateIsOpen(true);
                  }}
                >
                  Create New Post
                </Button>
              ) : selectedCoords == null && username ? (
                <Button size="medium" variant="outlined">
                  Click on the map to post
                </Button>
              ) : (
                <Button
                  size="medium"
                  id="gotoLogin"
                  variant="outlined"
                  onClick={() => {
                    router.push("/auth/login");
                  }}
                >
                  Login to post
                </Button>
              )}

              <Map
                style={{
                  width: "100%",
                  position: "relative",
                  height: "100%",
                }}
                onMapClick={setSelectedCoords}
                points={points}
                onMarkerClick={setSelectedPost}
              />
            </Stack>
            {selectedPost && (
              <Content
                post={selectedPost}
                username={username}
                refetch={refetch}
              />
            )}
            <SubmitContent
              open={createIsOpen}
              onClose={() => {
                setCreateIsOpen(false);
                refetch();
              }}
              coords={selectedCoords}
            />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
