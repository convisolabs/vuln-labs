const express = require("express");
const cors = require("cors");
const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, '.env') });

const dbConnector = require('./db');

dbConnector();

const app = express();

//middleware

app.use(cors());
app.use(express.json());

//routes

app.use("/authentication", require("./routes/jwtAuth"));

app.use("/dashboard", require("./routes/dashboard"));

app.listen(5000, () => {
  console.log(`Server is starting on port 5000`);
});
