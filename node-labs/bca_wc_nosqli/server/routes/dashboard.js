const router = require("express").Router();
const authorize = require("../middleware/authorize");
const Todo = require('../models/todo');

router.get("/", authorize, async (req, res) => {
  try {
    // url to NoSQLInjection: http://localhost:5000/dashboard?id[$ne]=000000000000000000000000
    // in Express, id[$ne]=0 == id:{ $ne: 0 }
    const todos = await Todo.find({ user_id: req.query.id })
    res.json(todos);
  } catch (err) {
    console.log(err)
    res.status(500).send("Erro no Servidor");
  }
});

router.post("/todos", authorize, async (req, res) => {
  try {
    console.log(req.body)
    const { description } = req.body;
    const newTodo = await Todo.create({
      description,
      user_id: req.user.id
    });

    res.json(newTodo);
  } catch (err) {
    console.log(err)
    res.status(500).send("Erro no Servidor");
  }
});

router.put("/todos/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await Todo.findOneAndUpdate(
      {
        _id: id,
        user_id: req.user.id
      },
      {
        description
      });

    if (!updateTodo) {
      return res.status(401).json("Todo Não Pertence a você");
    }

    res.json("Todo Atualizado");
  } catch (err) {
    res.status(500).send("Erro no Servidor");
  }
});

router.delete("/todos/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOneAndDelete({ _id: id, user_id: req.user.id });

    if (!todo) {
      return res.status(401).json("Todo Não Pertence a você");
    }

    res.json("Todo Deletado");
  } catch (err) {
    res.status(500).send("Erro no Servidor");
  }
});

module.exports = router;
