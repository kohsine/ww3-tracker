import useSWR from 'swr'
import Login from './auth/login'
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
}
