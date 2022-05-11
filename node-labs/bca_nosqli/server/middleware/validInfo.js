module.exports = function (req, res, next) {
  const { email, name, password } = req.body;

  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path === "/register") {
    if (![email, name, password].every(Boolean)) {
      return res.json("Faltando Credenciais");
    } else if (!validEmail(email)) {
      return res.json("Email Inválido");
    }
  } else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      return res.json("Faltando Credenciais");
    } else if (!validEmail(email)) {
      return res.json("Email Inválido");
    }
  }

  next();
};
