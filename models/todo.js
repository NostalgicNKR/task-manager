const mongoose = require("mongoose");
const Joi = require("joi");

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

function validate(todo) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    status: Joi.number(),
  });

  return schema.validate(todo);
}

exports.Todo = Todo;
exports.validate = validate;
