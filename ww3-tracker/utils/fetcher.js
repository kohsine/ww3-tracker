export async function fetcher (query) {
  const res = await fetch('/api/graphql', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });
  return await res.json();
}

export async function login_query (query) {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(query),
  });
  return await res.json();
}


export function gql_docker_fetcher (query) {
    return fetch('http://localhost:5433' + '/graphql', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ query }),
    })
    .then((res) => res.json())
    .then((json) => json.data)
}