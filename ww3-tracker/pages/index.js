import useSWR from 'swr'
import SimpleMap from '../components/map/map'
import Login from './auth/login'

const fetcher = (query) =>
  fetch('/api/graphql', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((json) => json.data)

export default function Index() {
  return (
    <SimpleMap />
  )
  const { data, error } = useSWR('{ users { name } }', fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  const { users } = data

  return (
    <div>
      <Login/>
      {users.map((user, i) => (
        <div key={i}>{user.name}</div>
      ))}
    </div>
  )
}
