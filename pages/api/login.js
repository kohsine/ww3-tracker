import { setCookies, getCookie } from 'cookies-next';
import { pg_config } from '../../database/connect';
const { Pool, Client } = require('pg')

export default async function handler(req, res) {
  setCookies('server-key', 'value', { req, res, maxAge: 60 * 60 * 24, sameSite: "strict" });
  const cookie = getCookie('server-key', { req, res });
  const { form_username: username, password } = req.body;

  const client = new Client(pg_config)
  client.connect()
  const user = await client.query(`SELECT * FROM users WHERE username = '${username}';`)
  .then(res => res.rows[0])
  .catch(e => console.error(e.stack))
  .finally(() => client.end());

  console.log("user " + JSON.stringify(user));
  if (!user) {
    console.log("user not found");
    res.status(404).json({error: "user not found."});
    return;
  }

  if (user.pass != password) {
    console.log("wrong password");
    console.log("user password " + user.pass)
    res.status(403).json({error: "password incorrect"});
    return;
  }

  var jwt = require('jsonwebtoken');
  var token = jwt.sign({ username }, 'shhhhh');
  setCookies('token', token, { req, res, maxAge: 60 * 60 * 24, sameSite: "strict" });
  setCookies('username', username, { req, res, maxAge: 60 * 60 * 24, sameSite: "strict" });

  res.status(200).json({message: 'ok'});
}