const mongoose = require("mongoose");
const Joi = require("joi");
Joi.ObjectId = require("joi-objectid")(Joi);

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
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

function validate(todo) {
  const schema = Joi.object({
    _id: Joi.string(),
    name: Joi.string().min(3).max(50).required(),
    deadline: Joi.date(),
  });

  return schema.validate(todo);
}

exports.Todo = Todo;
exports.validate = validate;
