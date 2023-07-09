const express = require("express");
const router = express.Router();
const _ = require("lodash");
const Joi = require("joi");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(200).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).send("Invalid Email or Password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(404).send("Invalid Email or Password");

  const token = user.generateToken();
  res.send({ name: user.name, email: user.email, token: token });
});

function validate(user) {
  const schema = Joi.object({
    email: Joi.string().min(3).max(100).required().email(),
    password: Joi.string().min(8).max(255).required(),
  });
  return schema.validate(user);
}

module.exports = router;
