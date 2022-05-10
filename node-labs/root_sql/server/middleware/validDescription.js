module.exports = function (req, res, next) {
  const { description, ...rest } = req.body;

  const isEmpty = Object.keys(rest).length === 0;

  // sempre devemos validar a entrada
  if (!isEmpty) {
    return res.status(403).json("Mais campos enviados do que necessários");
  }
  if (req.method === "POST" || req.method === "PUT") {
    if (typeof description === 'string' || description.length < 3) {
      return res.status(403).json("campo 'description' deve ser string e deve ter ao menos 3 caracteres");
    }
  }

  // Poderiamos utilizar req.method !== "POST" para "escrever menos código"
  // mas isso pode gerar problemas futuramente, caso esse middleware seja utilizado
  // para um GET
  if (req.method === "PUT" || req.method === "DELETE") {
    if (!req.params.id) {
      return res.status(403).json("id do todo deve ser informado em params");
    }
  }

  next();
};
