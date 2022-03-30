import { setCookies, getCookie } from 'cookies-next';
import client from '../../database/client';

export default async function handler(req, res) {
    let { form_username: username, password } = req.body;
    username = username.trim();
    console.log("username " + username);
    console.log("password " + password);

    let user;
    try {
        const { rows } = await client.query(`SELECT * FROM users WHERE username = '${username}';`);
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

    const text = 'INSERT INTO users(username, pass) VALUES($1, $2) RETURNING *;';
    const values = [username, password];
    try {
        const { rows } = await client.query(text, values);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal server error: Unable to add user." });
        return;
    }

    var jwt = require('jsonwebtoken');
    var token = jwt.sign({ username }, 'shhhhh');
    setCookies('token', token, { req, res, maxAge: 60 * 60 * 24, sameSite: "strict" });
    setCookies('username', username, { req, res, maxAge: 60 * 60 * 24, sameSite: "strict" });

    res.status(200).json({ message: 'ok' });
}