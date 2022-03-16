import useSWR from 'swr'
import Login from './auth/login'
import { fetcher } from '../utils/fetcher'
import { Box, Container, TextField, Stack, Button } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from "react";
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';
import SubmitContent from './components/content/submitContent'

export default function Index() {
    const [username, setUsername] = useState(null);
    const [createIsOpen, setCreateIsOpen] = useState(false);

    useEffect(() => setUsername(getCookie("username")), []);

    const signoutHandler = () => {
      removeCookies('username');
      removeCookies('token');
      setUsername(undefined);
    }

    const router = useRouter();

    return (
        <div>
            <Box height="90vh" flexDirection="column" justifyContent="flex-start" alignItems="center" display="flex" style={{ borderWidth: "1px", borderStyle: 'solid' }}>
                {
                    username ? <>

                        <Container maxWidth="lg" >
                            <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>

                                <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center" marginBottom="20px" style={{ width: '100%' }} >
                                    <div></div>
                                    <h1 style={{ fontWeight: 200 }}>World War III Tracker</h1>
                                    <Stack direction="row" alignItems="baseline" spacing={4}>
                                        <h3 style={{ fontWeight: 200 }}>Hello, {username}</h3>
                                        <Button size="small" id="signout" variant="outlined"
                                            onClick={() => signoutHandler()}
                                        >
                                            Signout
                                        </Button>
                                    </Stack>
                                </Stack>

                                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                                    <Button size="small" id="create" variant="outlined"
                                        onClick={() => {
                                            setCreateIsOpen(true);
                                        }
                                        }
                                    >
                                        Create New Post
                                    </Button>
                                </Stack>
                                <SubmitContent open={createIsOpen} onClose={() => { setCreateIsOpen(false) }} />



                            </Stack>



                        </Container>



                    </>
                        : <>
                            <h1 style={{ fontWeight: 200 }}>World War III Tracker</h1>

                            <Button size="small" id="gotoLogin" variant="outlined" onClick={() => {
                                router.push("/auth/login");
                            }}>Login</Button>
                        </>
                }
            </Box>
        </div>
    )
}
