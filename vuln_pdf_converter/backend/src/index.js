const express = require("express");
const cors = require("cors");
const app = express();

//middleware

app.use(cors());
app.use(express.json());

//routes

app.use("/pdf", require("./routes/pdf"));

app.listen(5000, () => {
  console.log(`Server is starting on port 5000`);
});