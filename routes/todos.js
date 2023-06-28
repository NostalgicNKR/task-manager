const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { Todo, validate } = require("../models/todo");
const auth = require("../middleware/auth");
const { User } = require("../models/user");

router.get("/", async (req, res) => {
  const todos = await Todo.find();
  res.send(todos);
});

router.get("/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.status(404).send("Todo not found with given ID");

  res.send(todo);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(200).send(error.details[0].message);

  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).send("No user exists with given user id");

  const todo = new Todo({
    name: req.body.name,
    userId: user._id,
  });
  const result = await todo.save();
  res.send(result);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(200).send(error.details[0].message);

  const todo = await Todo.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    status: req.body.status,
  });
  if (!todo) return res.status(404).send("Todo not found with given ID");

  res.send(todo);
});

router.delete("/:id", async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);
  if (!todo) return res.status(404).send("Todo not found with given ID");
  res.send(todo);
});

module.exports = router;
