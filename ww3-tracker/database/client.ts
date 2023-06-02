import { Pool, QueryArrayConfig } from "pg";

export const pgConfig = {
  user: "postgres",
  host: "db",
  database: "ww3_tracker",
  password: "example",
  port: 5432,
  schema: "public",
};

export const pgConfigDev = {
  user: "postgres",
  host: "localhost",
  database: "ww3_tracker",
  password: "example",
  port: 5432,
  schema: "public",
};

console.log("node env", process.env.NODE_ENV);

//let client: Client;
const pool = new Pool(
  process.env.NODE_ENV === "production" ? pgConfig : pgConfigDev
);

/*if (process.env.NODE_ENV === "production") {
  console.log("in production");
  client = new Client(pgConfig);
  client.connect();
} else {
  console.log("in dev");
  if (!global.client) {
    console.log("creating new client");
    global.client = new Client(pgConfigDev);
    global.client.connect();
  }

  client = global.client;
}

export default client;*/

export async function query(text: QueryArrayConfig<any>, params: any) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log("executed query", { text, duration, rows: res.rowCount });
  return res;
}

export async function getClient() {
  const client = await pool.connect();
  const query = client.query;
  const release = client.release;
  // set a timeout of 5 seconds, after which we will log this client's last query
  const timeout = setTimeout(() => {
    console.error("A client has been checked out for more than 5 seconds!");
    console.error(
      //@ts-expect-error
      `The last executed query on this client was: ${client.lastQuery}`
    );
  }, 5000);
  // monkey patch the query method to keep track of the last query executed
  client.query = (...args: any) => {
    //@ts-expect-error
    client.lastQuery = args;
    return query.apply(client, args);
  };
  client.release = () => {
    // clear our timeout
    clearTimeout(timeout);
    // set the methods back to their old un-monkey-patched version
    client.query = query;
    client.release = release;
    return release.apply(client);
  };
  return client;
}
