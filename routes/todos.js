const express = require("express");
const router = express.Router();
const Joi = require("joi");
const _ = require("lodash");
const { Todo, validate } = require("../models/todo");
const auth = require("../middleware/auth");
const { User } = require("../models/user");
const mongoose = require("mongoose");

// router.get("/", auth, async (req, res) => {
//   const todos = await Todo.find({ userId: req.user._id }).sort("-created");
//   if (!todos) return res.send("Empty Todo List");
//   res.send(todos);
// });

router.get("/", auth, async (req, res) => {
  const availableSorts = ["name", "-name", "created", "-created"];
  const sortOrder =
    req.query.sort && availableSorts.includes(req.query.sort)
      ? req.query.sort
      : "-created";
  const filters = { userId: req.user._id };
  if (req.query.status == 1 || req.query.status == 0) {
    filters.status = parseInt(req.query.status);
  }
  const todos = await Todo.find(filters).sort(sortOrder);
  if (!todos) return res.send("Empty Todo List");
  res.send(todos);
});

router.get("/:id", async (req, auth, res) => {
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

router.put("/", auth, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.body._id))
    return res.status(401).send("ID not supplied or Invalid ID");
  const { error } = validateUpdate(req.body);
  if (error) return res.status(200).send(error.details[0].message);

  const todo = await Todo.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    status: req.body.status,
  });
  if (!todo) return res.status(404).send("Todo not found with given ID");

  res.send(todo);
});

router.delete("/:id", auth, async (req, res) => {
  //   if (!req.params.id) return res.status(201).send("ID not supplied!");
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(401).send("ID not supplied or Invalid ID");
  const todo = await Todo.findByIdAndDelete(req.params.id);
  if (!todo) return res.status(404).send("Todo not found with given ID");
  res.send(todo);
});

function validateUpdate(todo) {
  const schema = Joi.object({
    _id: Joi.string(),
    name: Joi.string().min(3).max(50).required(),
    status: Joi.number(),
  }).unknown();

  return schema.validate(todo);
}

module.exports = router;
