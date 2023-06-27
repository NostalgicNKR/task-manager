const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(200).send(error.details[0].message);

  const user = new User(_.pick(req.body, ["email", "name", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  const result = await user.save();
  res.send(_.pick(result, ["email", "name"]));
});

module.exports = router;
