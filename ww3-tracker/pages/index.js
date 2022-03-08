import useSWR from 'swr'
import SimpleMap from '../components/map/map'
import Login from './auth/login'
import fetcher from '../utils/fetcher'

export default function Index() {
  // return (
  //   <SimpleMap />
  // )
  const { data, error } = useSWR('{ users { name } }', fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  const { users } = data

  return (
    <div>
      {
        !users && <Login />
      }
      {users.map((user, i) => (
        <div key={i}>{user.name}</div>
      ))}
    </div>
  )
}
