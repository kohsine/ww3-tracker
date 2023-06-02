import { setCookies } from "cookies-next";
import { getClient } from "../../database/client";

export default async function handler(req: any, res: any) {
  let { form_username: username, password } = req.body;
  username = username.trim();

  let user;
  const client = await getClient();
  try {
    const { rows } = await client.query(
      `SELECT * FROM users WHERE username = '${username}';`
    );
    user = rows[0];
  } catch (e) {
    console.log(e);
  }

  if (user) {
    console.log("username already exists.");
    res.status(409).json({ error: "user already exists." });
    return;
  }

  if (!password) {
    console.log("Empty password.");
    res.status(400).json({ error: "Empty password." });
    return;
  }

  const bcrypt = require("bcrypt");
  const hash = await bcrypt.hash(password, 10);

  const text = "INSERT INTO users(username, pass) VALUES($1, $2) RETURNING *;";
  const values = [username, hash];
  try {
    await client.query(text, values);
    client.release();
  } catch (e) {
    console.log(e);
    client.release();
    res
      .status(500)
      .json({ error: "Internal server error: Unable to add user." });
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
