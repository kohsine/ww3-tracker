import React from 'react'
import { Box, Container, TextField, Stack, Button } from '@mui/material'


export default function Login(props) {


    return <>
        <Box height="80vh" flexDirection="column" justifyContent="center" display="flex">
            <Stack spacing={2} direction="row" justifyContent="center" marginBottom="20px">

                <TextField size="small" id="username" variant="filled" label="Username" />
                <TextField size="small" id="password" variant="filled" label="Password" type="password" />

            </Stack>
            <Stack spacing={1}>
                <Button size="small" id="login" variant="text">Login</Button>
                <Button size="small" id="login" variant="text">Signup</Button>
            </Stack>

        </Box>
    </>
}