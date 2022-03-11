export function gql_fetcher (query) {
    return fetch('/api/graphql', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ query }),
    })
    .then((res) => res.json())
    .then((json) => {
        //console.log("api data " + JSON.stringify(json));
        return json;
    })
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