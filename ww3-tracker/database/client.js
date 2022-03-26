const { Pool, Client } = require('pg')

export const pg_config = {
    user: 'postgres',
    host: 'localhost',
    database: 'ww3_tracker',
    password: 'example',
    port: 5432,
    schema: 'public',
}

let client

if (process.env.NODE_ENV === "production") {
    console.log("in production");
    client = new Client(pg_config);
    client.connect();
} else {
    console.log("in dev");
    if (!global.client) {
        console.log("creating new client");
        global.client = new Client(pg_config);
        global.client.connect();
    }

    client = global.client
}

export default client