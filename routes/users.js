const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const auth = require("../middleware/auth");

router.post("/register", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const userFound = await User.findOne({ email: req.body.email });
  if (userFound) return res.status(404).send("Email already exists!");

  const user = new User(_.pick(req.body, ["email", "name", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  const result = await user.save();
  res.send(_.pick(result, ["email", "name"]));
});

router.put("/update", auth, async (req, res) => {
  const { error } = validateUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).send("User not found with given email");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(404).send("Incorrect Password");
  user.name = req.body.name;

  if (req.body.newPassword) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.newPassword, salt);
  }

  const result = await user.save();
  res.send(_.pick(result, ["email", "name"]));
});

function validateUpdate(user) {
  const schema = Joi.object({
    email: Joi.string().min(3).max(100).required().email(),
    name: Joi.string().min(6).max(50).required(),
    password: Joi.string().min(8).max(255).required(),
    newPassword: Joi.string().min(8).max(255),
  });
  return schema.validate(user);
}

module.exports = router;
