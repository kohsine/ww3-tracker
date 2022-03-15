import useSWR from 'swr'
import Login from './auth/login'
<<<<<<< HEAD
import { gql_fetcher } from '../utils/fetcher'
import Map from './components/map/map'

export default function Index() {
    const { error, data } = useSWR('{ users { nodes { username } } }', gql_fetcher);
    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>
    console.log("data " + JSON.stringify(data));
    const users = data.users.nodes;

    return (
        <Map />
    )
    return (
        <div>
            {
                !users && <Login />
            }
            {users.map((user, i) => (
                <div key={i}>{user.username}</div>
            ))}
        </div>
    )
=======
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
>>>>>>> 052eb3d (very minimal login using cookies, no auth yet)
}
