import useSWR from 'swr'
import Login from './auth/login'
import { fetcher } from '../utils/fetcher'
import { Box, Container, TextField, Stack, Button } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from "react";
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';

export default function Index() {
  const [username, setUsername] = useState("");
  
  useEffect(() => setUsername(getCookie("username")), []);

  const router = useRouter();

  return (
    <div>
      <Button size="small" id="gotoLogin" variant="text" onClick={() => {
        router.push("/auth/login");
      }}>Login</Button>
      <span>Logged in as {username}</span> 
    </div>
  )
}
