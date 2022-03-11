import useSWR from 'swr'
import SimpleMap from '../components/map/map'
import Login from './auth/login'
import { gql_fetcher } from '../utils/fetcher'

export default function Index() {
  // return (
  //   <SimpleMap />
  // ) 
  const { error , data } = useSWR('{ users { nodes { username } } }', gql_fetcher);
  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
  console.log("data " + JSON.stringify(data));
  const users = data.users.nodes;

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
