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