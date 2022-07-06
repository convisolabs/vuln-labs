const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const pool = require("../db");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");

router.post("/register", validInfo, async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const user = await pool.query(
      "SELECT user_name FROM users WHERE user_email = $1",
      [email]
    );

    if (user.rows.length > 0) {
      return res.status(401).json("User already exist!");
    }

    const cryptPassword = crypto.createHash('md5').update(password).digest('hex');

    let newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, cryptPassword]
    );

    const jwtToken = jwtGenerator(newUser.rows[0].user_id);

    return res.json({ jwtToken, userId: user.rows[0].user_id });
  } catch (err) {
    console.error(err.message);
    if (err.constraint == "users_user_name_key") {
      return res.status(401).json("Username already exist");
    }
    res.status(500).send("Server error");
  }
});

router.post("/login", validInfo, async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credential");
    }
    user = user.rows[0];

    const hashedPasswdInput = crypto.createHash('md5').update(password).digest('hex');

    const validPassword = user.user_password === hashedPasswdInput;

    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }

    //----handle unique login
    if (user.is_logged) {
      return res.status(401).json("Session Already Initialized For This User");
    }
    await pool.query(
      "UPDATE users SET is_logged = true WHERE user_id = $1",
      [user.user_id]
    );
    //----!handle unique login

    const jwtToken = jwtGenerator(user.user_id);
    return res.json({ jwtToken, userId: user.user_id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/logout", authorize, async (req, res) => {
  try {
    await pool.query(
      "UPDATE users SET is_logged = false WHERE user_id = $1",
      [req.user.id]
    );
    return res.status(203).send();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/verify", authorize, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
