const express = require("express");
const router = express.Router();
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");
const User = require("../models/user");
// sanitize mongo input
const sanitize = require('mongo-sanitize');


//authorizeentication

router.post("/register", validInfo, async (req, res) => {
  let { email, name, password } = req.body;
  email = sanitize(email);

  try {
    const existingUser = await User.findOne({ user_email: email });
    if (existingUser) return res.status(400).send("Usuário já cadastrado com esse email");

    const user = await User.create({
      user_email: email,
      user_name: name,
      user_password: password
    });

    const jwtToken = jwtGenerator(user._id);

    return res.json({ jwtToken });
  } catch (err) {
    console.log(err);
    res.status(500).send("Erro no Servidor");
  }
});

router.post("/login", validInfo, async (req, res) => {
  let { email, password } = req.body;
  email = sanitize(email);
  try {
    const user = await User.findOne({ user_email: email });

    if (!user) {
      return res.status(401).json("Credenciais inválidas");
    }
    const validPassword = user.authenticate(password);

    if (!validPassword) {
      return res.status(401).json("Credenciais inválidas");
    }

    const jwtToken = jwtGenerator(user._id);
    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no Servidor");
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
