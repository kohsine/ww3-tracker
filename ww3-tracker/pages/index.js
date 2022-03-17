import useSWR from 'swr'
import Login from './auth/login'
import { fetcher } from '../utils/fetcher'
import { Box, Container, TextField, Stack, Button } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from "react";
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';
import SubmitContent from './components/content/submitContent'
import Map from './components/map/map'
import { UiFileInputButton } from './components/upload/UiFileInputButton'

// #191919
// #2D4263
// #C84B31
// #ECDBBA

export default function Index() {
    const [username, setUsername] = useState(null);
    const [createIsOpen, setCreateIsOpen] = useState(false);
    const [selectedCoords, setSelectedCoords] = useState(null);

    useEffect(() => setUsername(getCookie("username")), []);

    const signoutHandler = () => {
        removeCookies('username');
        removeCookies('token');
        setUsername(undefined);
    }

    const onChangeFile = async (formData) => {
      const axios = require('axios');
      const config = {
        headers: { 'content-type': 'multipart/form-data' },
        onUploadProgress: (event) => {
          console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
        },
      };
  
      const response = await axios.post('/api/upload', formData, config);
  
      console.log('response', response.data);
    };

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

                                <Map style={{ width: '100%', height: '65vh', position: 'relative' }} onMapClick={setSelectedCoords}/>

                            </Stack>
                            <Stack direction="column" style={{ backgroundColor: 'red', width: '40%', height: '100%' }}>
                                <h3>Recent posts</h3>
                                <Box style={{ height: '65vh', backgroundColor: 'lightblue' }}>
                                    placeholder
                                </Box>
                            </Stack>
                        </Stack>
                        <SubmitContent open={createIsOpen} onClose={() => { setCreateIsOpen(false) }} coords={selectedCoords}/>



                    </Stack>



                </Container>




            </Box>
        </div>
    )
}
