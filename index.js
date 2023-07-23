const express = require("express");
const app = express();
const mongoose = require("mongoose");
const todos = require("./routes/todos");
const users = require("./routes/users");
const auth = require("./routes/auth");
const profile = require("./routes/profile");
const cors = require("cors");
const config = require("config");

mongoose
  .connect(config.get("db-url"))
  .then(() => console.log("Connected to mongo successfully!"))
  .catch((err) =>
    console.log("Something failed while connected to mongodb!", err)
  );

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use("/api/todos", todos);
app.use("/api/auth/", users);
app.use("/api/auth/login", auth);
app.use("/api/me", profile);

const PORT = config.get("port") || 3500;
app.listen(PORT, () => console.log("Listening on Port: " + PORT));
