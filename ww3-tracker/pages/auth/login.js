import React, { useState } from "react";
import { Box, Container, TextField, Stack, Button, Typography } from '@mui/material'
import { login_query } from "../../utils/fetcher";
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';
import { useRouter } from 'next/router'

export default function Login(props) {

  const [formValues, setFormValues] = useState({username: "", password: ""});
  const [error, setError] = useState("");

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    console.log(formValues);
    const form_username = event.currentTarget.username.value;
    console.log("form username " + form_username);
    const password = event.currentTarget.password.value;
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({form_username, password}),
    });
    const body = await res.json();
    const token = getCookie('token');
    const username = getCookie('username');
    console.log("res " + JSON.stringify(res));
    console.log("token " + token);
    console.log("username " + username);
    console.log("status " + res.status);

    if (res.status == 404) {
      console.log("Username not found.");
      setError("Username not found.")
      return;
    }

    if (res.status == 403) {
      console.log("Incorrect password.")
      setError("Incorrect password.")
      return;
    }

    router.push('/');
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    console.log(formValues);
    const form_username = event.currentTarget.username.value;
    console.log("form username " + form_username);
    const password = event.currentTarget.password.value;
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({form_username, password}),
    });
    const body = await res.json();
    const token = getCookie('token');
    const username = getCookie('username');
    console.log("res " + JSON.stringify(res));
    console.log("token " + token);
    console.log("username " + username);
    console.log("status " + res.status);

    if (res.status == 400) {
      console.log("Empty password.");
      setError("Empty password.")
      return;
    }

    if (res.status == 409) {
      console.log("username already exists.");
      setError("username already exists.")
      return;
    }

    router.push('/');
  }

  return <>
    <Box height="80vh" flexDirection="column" justifyContent="center" display="flex" alignItems="center">
      <Typography component="h2">
        {error}
      </Typography>
      <form onSubmit={handleLoginSubmit}>
        <Stack spacing={2} direction="row" justifyContent="center" marginBottom="80px">
          <TextField size="small" name="username" variant="filled" label="Username" onChange={handleInputChange} />
          <TextField size="small" name="password" variant="filled" label="Password" type="password" onChange={handleInputChange} />
          <Button size="small" name="action" value="login" variant="text" type="submit">Login</Button>
        </Stack>
      </form>
      <form onSubmit={handleSignupSubmit}>
        <Stack spacing={2} direction="row" justifyContent="center" marginBottom="20px">
          <TextField size="small" name="username" variant="filled" label="Username" onChange={handleInputChange} />
          <TextField size="small" name="password" variant="filled" label="Password" type="password" onChange={handleInputChange} />
          <Button size="small" ame="action" value="signup" variant="text" type="submit">Signup</Button>
        </Stack>
      </form>
    </Box>
  </>
}