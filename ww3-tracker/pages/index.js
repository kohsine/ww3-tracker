import { Box, Container, TextField, Stack, Button } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from "react";
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';
import SubmitContent from './components/content/submitContent'
import Map from './components/map/map'
import { mapPoints } from '../utils/testData'
import { useQuery, gql } from '@apollo/client';
import ContentView from './components/content/contentView';

// #191919
// #2D4263
// #C84B31
// #ECDBBA

const GET_POSTS = gql`
    query {
        posts {
            id
            title
            description
            lng
            lat
            url
            author {
                username
            }
        }
    }
`;

export default function Index() {
    const [username, setUsername] = useState(null);
    const [createIsOpen, setCreateIsOpen] = useState(false);
    const [selectedCoords, setSelectedCoords] = useState(null);
    const [points, setPoints] = useState([]);
    
    const { loading, error, data, refetch } = useQuery(GET_POSTS);

    useEffect(() => {
        setUsername(getCookie("username"));
    }, []);

    useEffect(() => {
        if (data) {
            const posts = data.posts;
            const pts = posts.map(post => (
                {
                    properties: post,
                    geometry: {
                        type: "Point",
                        coordinates: [post.lng, post.lat]
                    }
                }
            ));
            setPoints(pts);
        }
    }, [data]);

    const signoutHandler = () => {
        removeCookies('username');
        removeCookies('token');
        setUsername(undefined);
    }

    const router = useRouter();

    return (
        <div>
            <style jsx global>
                {`
                body {
                    margin: 0;
                    background-color: #191919;
                    font-family: 'Georgia', sans-serif;
                }
                `}
            </style>

            <Box height="100vh" flexDirection="column" justifyContent="flex-start" alignItems="center" display="flex">

                <Container maxWidth={false}>
                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} style={{ backgroundColor: '' }}>
                        <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center" marginBottom="20px" style={{ width: '100%' }} >
                            <div></div>
                            <h1 style={{ fontWeight: 200, color: '#ECDBBA' }}>World War III Tracker</h1>

                            {
                                username ?
                                    (
                                        <Stack direction="row" alignItems="baseline" spacing={4}>
                                            <h3 style={{ fontWeight: 200, color: "#ECDBBA" }}>{username}</h3>
                                            <Button size="small" id="signout" variant="outlined"
                                                onClick={() => signoutHandler()}
                                            >
                                                Signout
                                            </Button>
                                        </Stack>
                                    ) : (
                                        <Stack direction="row" alignItems="baseline" spacing={4}>
                                            <h3 style={{ fontWeight: 200, color: "#ECDBBA" }}>STAND WITH UKRAINE</h3>

                                            <Button size="small" id="gotoLogin" variant="outlined" onClick={() => { router.push("/auth/login"); }}>
                                                Login
                                            </Button>
                                        </Stack>
                                    )
                            }
                        </Stack>

                        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} width="100%" style={{}}>
                            <Stack direction="column" width="50%" spacing={2}>

                                <Button size="medium" id="create" variant="outlined" onClick={() => { setCreateIsOpen(true); }}>
                                    Create New Post
                                </Button>

                                <Map style={{ width: '100%', height: '65vh', position: 'relative' }} onMapClick={setSelectedCoords} points={points} />

                            </Stack>
                            <Stack direction="column" style={{ backgroundColor: 'red', width: '40%', height: '100%' }}>
                                <h3>Recent posts</h3>
                                <Box style={{ height: '65vh', backgroundColor: 'lightblue' }}>
                                    <ContentView />
                                </Box>
                            </Stack>
                        </Stack>
                        <SubmitContent open={createIsOpen} onClose={() => { setCreateIsOpen(false); refetch(); }} coords={selectedCoords} />



                    </Stack>



                </Container>




            </Box>
        </div>
    )
}
