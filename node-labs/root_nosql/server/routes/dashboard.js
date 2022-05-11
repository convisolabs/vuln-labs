const router = require("express").Router();
const authorize = require("../middleware/authorize");
const Todo = require('../models/todo');
// sanitize mongo input
const sanitize = require('mongo-sanitize');

router.get("/", authorize, async (req, res) => {
  try {
    const user_id = sanitize(req.user.id);
    const todos = await Todo.find({ user_id })
    res.json(todos);
  } catch (err) {
    console.log(err)
    res.status(500).send("Erro no Servidor");
  }
});

router.post("/todos", authorize, async (req, res) => {
  try {
    const { description } = req.body;
    const user_id = sanitize(req.user.id);
    const newTodo = await Todo.create({
      description,
      user_id
    });

    res.json(newTodo);
  } catch (err) {
    res.status(500).send("Erro no Servidor");
  }
});

router.put("/todos/:id", authorize, async (req, res) => {
  try {
    const id = sanitize(req.params.id);
    const user_id = sanitize(req.user.id);
    const { description } = req.body;
    console.log(id, user_id)
    const updateTodo = await Todo.findOneAndUpdate(
      {
        _id: id,
        user_id
      },
      {
        description
      });

    if (!updateTodo) {
      return res.status(401).json("Todo Não Pertence a você");
    }

    res.json("Todo Atualizado");
  } catch (err) {
    console.log(err)
    res.status(500).send("Erro no Servidor");
  }
});

router.delete("/todos/:id", authorize, async (req, res) => {
  try {
    const id = sanitize(req.params.id);
    const user_id = sanitize(req.user.id);

    const todo = await Todo.findOneAndDelete({ _id: id, user_id });

    if (!todo) {
      return res.status(401).json("Todo Não Pertence a você");
    }

    res.json("Todo Deletado");
  } catch (err) {
    res.status(500).send("Erro no Servidor");
  }
});

module.exports = router;
