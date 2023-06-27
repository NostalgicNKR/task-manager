const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    minLength: 3,
    maxLength: 100,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    minLength: 6,
    maxLength: 50,
    required: true,
  },
  password: {
    type: String,
    minLength: 8,
    maxLength: 255,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

function validate(user) {
  const schema = Joi.object({
    email: Joi.string().min(3).max(100).required().email(),
    name: Joi.string().min(6).max(50).required(),
    password: Joi.string().min(8).max(255).required(),
  });
  return schema.validate(user);
}

exports.User = User;
exports.validate = validate;
