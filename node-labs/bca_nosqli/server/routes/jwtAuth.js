const express = require("express");
const router = express.Router();
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");
const User = require("../models/user");

router.post("/register", validInfo, async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const existingUser = await User.findOne({ user_email: email });
    if (existingUser) return res.status(400).send("Usuário já cadastrado com esse email");

    // uma boa prática é ter nome distinto quando o dado que é enviado na requisição
    // e de como ele é salvo no banco de dados
    const user = await User.create({
      user_email: email,
      user_name: name,
      user_password: password
    });

    const jwtToken = jwtGenerator(user._id);

    return res.json({ jwtToken, userId: user._id });
  } catch (err) {
    console.log(err);
    res.status(500).send("Erro no Servidor");
  }
});

router.post("/login", validInfo, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ user_email: email });

    if (!user) {
      // não devemos expor qual das credenciais está incorreta
      return res.status(401).json("Credenciais inválidas");
    }
    const validPassword = user.authenticate(password);

    if (!validPassword) {
      // não devemos expor qual das credenciais está incorreta
      return res.status(401).json("Credenciais inválidas");
    }

    const jwtToken = jwtGenerator(user._id);
    return res.json({ jwtToken, userId: user._id });
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
