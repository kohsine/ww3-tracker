import { setCookies, getCookie } from 'cookies-next';
import { pg_config } from '../../database/connect';
const { Pool, Client } = require('pg')

export default async function handler(req, res) {
  let { form_username: username, password } = req.body;
  username = username.trim();
  console.log("username " + username);
  console.log("password " + password);

  const client = new Client(pg_config)
  client.connect()
  const user = await client.query(`SELECT * FROM "user" WHERE username = '${username}';`)
  .then(res => res.rows)
  .catch(e => console.error(e.stack));
  console.log("user " + JSON.stringify(user));

  if (user.length > 0) {
    console.log("username already exists.");
    res.status(409).json({error: "user already exists."});
    return;
  }

  if (!password) {
    console.log("Empty password.");
    res.status(400).json({error: "Empty password."});
    return;
  }

  const text = 'INSERT INTO "user"(username, pass) VALUES($1, $2) RETURNING *;';
  const values = [username, password];
  try {
    const res = await client.query(text, values);
    console.log("added user ", res.rows[0]);
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({error: "Internal server error: Unable to add user."});
    return;
  } finally {
    client.end();
  }

  var jwt = require('jsonwebtoken');
  var token = jwt.sign({ username }, 'shhhhh');
  setCookies('token', token, { req, res, maxAge: 60 * 60 * 24, sameSite: "strict" });
  setCookies('username', username, { req, res, maxAge: 60 * 60 * 24, sameSite: "strict" });

  res.status(200).json({message: 'ok'});
}