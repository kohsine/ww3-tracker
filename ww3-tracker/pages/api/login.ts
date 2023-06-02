import { setCookies } from "cookies-next";
import { getClient } from "../../database/client";

export default async function handler(req: any, res: any) {
  const { form_username: username, password } = req.body;

  let user;
  const client = await getClient();
  try {
    const { rows } = await client.query(
      `SELECT * FROM users WHERE username = '${username}';`
    );
    client.release();
    user = rows[0];
  } catch (e) {
    console.log(e);
    client.release();
  }

  console.log("user " + JSON.stringify(user));
  if (!user) {
    console.log("user not found");
    res.status(404).json({ error: "user not found." });
    return;
  }

  const bcrypt = require("bcrypt");
  const hash = user.pass;
  if (!(await bcrypt.compare(password, hash))) {
    res.status(403).json({ error: "password incorrect" });
    return;
  }

  const jwt = require("jsonwebtoken");
  const token = jwt.sign({ username }, process.env.JWT_SECRET);
  setCookies("token", token, {
    req,
    res,
    maxAge: 60 * 60 * 24,
    sameSite: "strict",
    secure: process.env.NODE_ENV == "production",
    httpOnly: true,
  });
  setCookies("username", username, {
    req,
    res,
    maxAge: 60 * 60 * 24,
    sameSite: "strict",
    secure: process.env.NODE_ENV == "production",
  });

  res.status(200).json({ message: "ok" });
}
