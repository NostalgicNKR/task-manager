const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi");
const _ = require("lodash");

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  deadline: Date,
  status: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

router.get("/", async (req, res) => {
  const todos = await Todo.find();
  res.send(todos);
});

router.get("/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.status(404).send("Todo not found with given ID");

  res.send(todo);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(200).send(error.details[0].message);

  const todo = new Todo(_.pick(req.body, ["name"]));
  const result = await todo.save();
  res.send(result);
});

function validate(todo) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
  });

  return schema.validate(todo);
}

module.exports = router;
