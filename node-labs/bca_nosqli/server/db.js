const mongoose = require('mongoose');

const dbConnector = () => {
  mongoose.connect(process.env.MONGODB_URL);

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("Connected successfully");
  });
  return db;
}

module.exports = dbConnector;