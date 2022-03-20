import React, { useEffect, useState } from "react";
import { Box, Container, TextField, Stack, Button, Typography } from '@mui/material'
import { login_query } from "../../utils/fetcher";
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';
import { useRouter } from 'next/router'
import PasswordStrengthBar from 'react-password-strength-bar';

export default function Login(props) {

  const [formValues, setFormValues] = useState({username: "", password: ""});
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [feedback, setFeedback] = useState("");

  const router = useRouter();

  const zxcvbn = require('zxcvbn');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log("password changes");
    const result = zxcvbn(formValues.password);
    console.log("password score " + result.score);
    console.log("feedback " + JSON.stringify(result.feedback));
    setDisabled(result.score > 1 && formValues.username.length > 0 ? false : true);
    setFeedback(result.feedback.warning);
  }, [formValues.password, formValues.username])

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
    const result = zxcvbn(formValues.password);
    if (result.score <= 1) {
      setError("Password is too weak.");
      return;
    }
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

    if (res.status != 200) {
      console.log(body.error);
      setError(body.error);
      return;
    }

    router.push('/');
  }

  return <Stack direction="row" justifyContent="space-evenly" alignItems="center" height={"100vh"}>
      <form onSubmit={handleLoginSubmit}>
        <Stack spacing={2} justifyContent="center">
          <Typography variant="h5" align="center">Login</Typography>
          <TextField size="small" name="username" variant="filled" label="Username" onChange={handleInputChange} />
          <TextField size="small" name="password" variant="filled" label="Password" type="password" onChange={handleInputChange} />
          <Button size="small" name="action" value="login" variant="outlined" type="submit">Login</Button>
        </Stack>
      </form>
      <form onSubmit={handleSignupSubmit}>
        <Stack spacing={2} justifyContent="center">
          <Typography variant="h5" align="center">Sign Up</Typography>
          <Typography variant="subtitle1">{error}</Typography>
          <TextField size="small" name="username" variant="filled" label="Username" onChange={handleInputChange} />
          <TextField size="small" name="password" variant="filled" label="Password" type="password" onChange={handleInputChange} />
          <PasswordStrengthBar password={formValues.password} style={{margin: 0}}/>
          <Button size="small" ame="action" value="signup" variant="contained" type="submit">Signup</Button>
        </Stack>
      </form>
    </Stack>
}