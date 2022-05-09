var User = require('../models/user');
var Todo = require('../models/todo');
const dbConnector = require('../db');
const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, '../.env') });

dbConnector();

const createUsers = async () => {
  const luiz = await User.create({
    user_name: "Luiz",
    user_email: "luiz@gmail.com",
    user_password: "test123"
  });
  const carlos = await User.create({
    user_name: "Carlos",
    user_email: "carlos@gmail.com",
    user_password: "test123"
  });
  return [luiz._id, carlos._id];
}

const createTodos = async ([luiz, carlos]) => {
  await Todo.create({
    user_id: luiz,
    description: "Testar Alterações",
  });
  await Todo.create({
    user_id: luiz,
    description: "Dar feedback",
  });
  await Todo.create({
    user_id: luiz,
    description: "Passar um café ;)",
  });

  await Todo.create({
    user_id: carlos,
    description: "Fazer alterações no Front",
  });
  await Todo.create({
    user_id: carlos,
    description: "Commitar Alterações",
  });
  await Todo.create({
    user_id: carlos,
    description: "Passar um café ;)",
  });
}

createUsers()
  .then(usersId => {
    createTodos(usersId);
    console.log("Database Populated!");
    process.exit()
  })
  .catch(error => console.log("Error on populate: ", error))