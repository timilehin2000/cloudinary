const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const user = require("./routes/user");

const app = express();

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database is running");
  })
  .catch((err) => {
    console.log(err);
  });

//middleware
app.use(express.json());

//route
app.use("/api/v1/users", user);

app.listen(3000, () => {
  console.log("server is running smoothly");
});
