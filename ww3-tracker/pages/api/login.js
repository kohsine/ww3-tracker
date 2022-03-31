import { setCookies, getCookie } from 'cookies-next';
import client from '../../database/client';

export default async function handler(req, res) {
  const { form_username: username, password } = req.body;

  let user;
  try {
    const { rows } = await client.query(`SELECT * FROM users WHERE username = '${username}';`);
    user = rows[0];
  } catch (e) {
    console.log(e);
  }

  console.log("user " + JSON.stringify(user));
  if (!user) {
    console.log("user not found");
    res.status(404).json({error: "user not found."});
    return;
  }

  const bcrypt = require('bcrypt');
  const hash = user.pass;
  if (!await bcrypt.compare(password, hash)) {
    res.status(403).json({error: "password incorrect"});
    return;
  }

  var jwt = require('jsonwebtoken');
  var token = jwt.sign({ username }, process.env.JWT_SECRET);
  setCookies('token', token, { req, res, maxAge: 60 * 60 * 24, sameSite: "strict", secure: process.env.NODE_ENV == "production", httpOnly: true});
  setCookies('username', username, { req, res, maxAge: 60 * 60 * 24, sameSite: "strict", secure: process.env.NODE_ENV == "production"});

  res.status(200).json({message: 'ok'});
}