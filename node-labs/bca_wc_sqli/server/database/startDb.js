var sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
var db = new sqlite3.Database('vulndb');

db.serialize(() => {

  // create users table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER NOT NULL PRIMARY KEY,
    user_name TEXT NOT NULL,
    user_email TEXT NOT NULL UNIQUE,
    user_password TEXT NOT NULL
  )`);

  // create todos table
  db.run(`CREATE TABLE IF NOT EXISTS todos(
    todo_id INTEGER NOT NULL PRIMARY KEY,
    user_id INTEGER,
    description TEXT NOT NULL,
    is_done BOOLEAN DEFAULT false,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
  )`);

  // populate with fake user
  db.run(`INSERT INTO users (user_name, user_email, user_password) 
    VALUES ('Luiz', 'luiz@gmail.com', 'cc03e747a6afbbcbf8be7668acfebee5')`); //password: test123

  db.run(`INSERT INTO users (user_name, user_email, user_password)
    VALUES ('Carlos', 'carlos@gmail.com', 'cc03e747a6afbbcbf8be7668acfebee5')`); //password: test123

  // populate with fake todo
  db.run(`INSERT INTO todos (user_id, description, is_done) VALUES (1, 'Testar Alterações', false)`);
  db.run(`INSERT INTO todos (user_id, description, is_done) VALUES (1, 'Dar feedback', false)`);
  db.run(`INSERT INTO todos (user_id, description, is_done) VALUES (1, 'Passar um café ;)', false)`);

  db.run(`INSERT INTO todos (user_id, description, is_done) VALUES (2, 'Fazer alterações no Front', false)`);
  db.run(`INSERT INTO todos (user_id, description, is_done) VALUES (2, 'Commitar Alterações', false)`);
  db.run(`INSERT INTO todos (user_id, description, is_done) VALUES (2, 'Passar um café ;)', false)`);
});
