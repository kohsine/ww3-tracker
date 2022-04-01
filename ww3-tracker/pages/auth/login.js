import React, { useState } from "react";
import { TextField, Stack, Button, Typography } from '@mui/material'
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router'

export default function Login(props) {

    const [formValues, setFormValues] = useState({ username: "", password: "" });
    const [loginError, setLoginError] = useState("");
    const [signupError, setSignupError] = useState("");

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
            body: JSON.stringify({ form_username, password }),
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
            setLoginError("Username not found.")
            return;
        }

        if (res.status == 403) {
            console.log("Incorrect password.")
            setLoginError("Incorrect password.")
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
            body: JSON.stringify({ form_username, password }),
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
            setSignupError(body.error);
            return;
        }

        router.push('/');
    }

    const inputStyle = { input: { color: '#ECDBBA' }, label: { color: '#ECDBBA' } }

    return <Stack direction="row" justifyContent="space-evenly" alignItems="center" height={"100vh"}>
        <style jsx global>
            {`
                body {
                    margin: 0;
                    background-color: #191919;
                    font-family: 'Georgia', sans-serif;
                    color: #ECDBBA;
                }
            `}
        </style>
        <form onSubmit={handleLoginSubmit}>
            <Stack spacing={2} justifyContent="center">
                <Typography variant="h5" align="center">Login</Typography>
                <Typography variant="subtitle1" align="center">{loginError}</Typography>
                <TextField size="small" name="username" variant="filled" label="Username" onChange={handleInputChange} sx={inputStyle} />
                <TextField size="small" name="password" variant="filled" label="Password" type="password" onChange={handleInputChange} sx={inputStyle} />
                <Button size="small" name="action" value="login" variant="outlined" type="submit">Login</Button>
            </Stack>
        </form>
        <form onSubmit={handleSignupSubmit}>
            <Stack spacing={2} justifyContent="center">
                <Typography variant="h5" align="center">Sign Up</Typography>
                <Typography variant="subtitle1" align="center">{signupError}</Typography>
                <TextField size="small" name="username" variant="filled" label="Username" onChange={handleInputChange} sx={inputStyle} />
                <TextField size="small" name="password" variant="filled" label="Password" type="password" onChange={handleInputChange} sx={inputStyle} />
                <Button size="small" ame="action" value="signup" variant="contained" type="submit">Signup</Button>
            </Stack>
        </form>
    </Stack>
}