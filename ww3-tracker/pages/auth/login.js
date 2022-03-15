import React, { useState } from "react";
import { Box, Container, TextField, Stack, Button } from '@mui/material'
import { login_query } from "../../utils/fetcher";
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';
import { useRouter } from 'next/router'

export default function Login(props) {

  const [formValues, setFormValues] = useState({username: "", password: ""});

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formValues);
    console.log("username " + event.currentTarget.username.value);
    const res = await login_query({
      username : event.currentTarget.username.value, 
      password : event.currentTarget.password.value
    })
    const cookies = getCookies();
    const serverkey = getCookie('server-key');
    const token = getCookie('token');
    const username = getCookie('username');
    console.log("cookies " + JSON.stringify(cookies));
    console.log("server key " + serverkey);
    console.log("res " + JSON.stringify(res));
    console.log("token " + token);
    console.log("username " + username);
    router.push('/');
  };

  return <>
    <Box height="80vh" flexDirection="column" justifyContent="center" display="flex">
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} direction="row" justifyContent="center" marginBottom="20px">
          <TextField size="small" id="username" name="username" variant="filled" label="Username" onChange={handleInputChange} />
          <TextField size="small" id="password" name="password" variant="filled" label="Password" type="password" onChange={handleInputChange} />
        </Stack>
        <Stack spacing={1}>
          <Button size="small" id="login" variant="text" type="submit">Login</Button>
          <Button size="small" id="login" variant="text">Signup</Button>
        </Stack>
      </form>
    </Box>
  </>
}