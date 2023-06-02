import { useState } from "react";
import { useRouter } from "next/router";
import { Stack } from "@mui/material";
import { Typography, TextField, Button } from "@mui/material";
import React from "react";

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

  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formUsername = event.currentTarget.username.value;
    const password = event.currentTarget.password.value;
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ form_username: formUsername, password }),
    }).then((res) => {
      if (res.status === 404) {
        setLoginError("Username not found.");
        return;
      }

      if (res.status === 403) {
        setLoginError("Incorrect password.");
        return;
      }

      router.push("/");
    });
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    const formUsername = event.currentTarget.username.value;
    const password = event.currentTarget.password.value;
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ form_username: formUsername, password }),
    });
    const body = await res.json();

    if (res.status !== 200) {
      setSignupError(body.error);
      return;
    }

    router.push("/");
  };

  const inputStyle = {
    input: { color: "#ECDBBA" },
    label: { color: "#ECDBBA" },
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
      height={"100vh"}
    >
      <form onSubmit={handleLoginSubmit}>
        <Stack spacing={2} justifyContent="center">
          <Typography variant="h5" align="center">
            Login
          </Typography>
          <Typography variant="subtitle1" align="center">
            {loginError}
          </Typography>
          <TextField
            size="small"
            name="username"
            variant="filled"
            label="Username"
            onChange={handleInputChange}
            sx={inputStyle}
          />
          <TextField
            size="small"
            name="password"
            variant="filled"
            label="Password"
            type="password"
            onChange={handleInputChange}
            sx={inputStyle}
          />
          <Button
            size="small"
            name="action"
            value="login"
            variant="outlined"
            type="submit"
          >
            Login
          </Button>
        </Stack>
      </form>
      <form onSubmit={handleSignupSubmit}>
        <Stack spacing={2} justifyContent="center">
          <Typography variant="h5" align="center">
            Sign Up
          </Typography>
          <Typography variant="subtitle1" align="center">
            {signupError}
          </Typography>
          <TextField
            size="small"
            name="username"
            variant="filled"
            label="Username"
            onChange={handleInputChange}
            sx={inputStyle}
          />
          <TextField
            size="small"
            name="password"
            variant="filled"
            label="Password"
            type="password"
            onChange={handleInputChange}
            sx={inputStyle}
          />
          <Button
            size="small"
            name="action"
            value="signup"
            variant="contained"
            type="submit"
          >
            Signup
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
