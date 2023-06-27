const express = require("express");
const app = express();
const mongoose = require("mongoose");
const todos = require("./routes/todos");
const users = require("./routes/users");

mongoose
  .connect("mongodb://127.0.0.1:27017/todoproject")
  .then(() => console.log("Connected to mongo successfully!"))
  .catch((err) =>
    console.log("Something failed while connected to mongodb!", err)
  );

app.use(express.json());
app.use("/api/todos", todos);
app.use("/api/users", users);

app.listen(3500, () => console.log("Listening on Port: 3500"));
