const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const auth = require("../middleware/auth");
const _ = require("lodash");

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).send("User not found!");
  res.send(_.pick(user, ["email", "name"]));
});

module.exports = router;
