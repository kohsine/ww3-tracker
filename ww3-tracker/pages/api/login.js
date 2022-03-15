import { setCookies, getCookie } from 'cookies-next';

export default async function handler(req, res) {
  setCookies('server-key', 'value', { req, res, maxAge: 60 * 60 * 24, sameSite: "strict" });
  const cookie = getCookie('server-key', { req, res });
  console.log("cookie " + cookie);
  console.log(req.body);
  const { username, password } = req.body;
  console.log("username " + username);
  console.log("password " + password);
  var jwt = require('jsonwebtoken');
  var token = jwt.sign({ username }, 'shhhhh');
  setCookies('token', token, { req, res, maxAge: 60 * 60 * 24, sameSite: "strict" });
  setCookies('username', username, { req, res, maxAge: 60 * 60 * 24, sameSite: "strict" });
  res.status(200).json({message: 'ok'});
}