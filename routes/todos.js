const express = require("express");
const router = express.Router();
const Joi = require("joi");
const _ = require("lodash");
const { Todo, validate } = require("../models/todo");
const auth = require("../middleware/auth");
const { User } = require("../models/user");
const mongoose = require("mongoose");

router.get("/", auth, async (req, res) => {
  //Supported Queries: sort, status, deadline

  const match = {};
  const availableSorts = [
    "name",
    "-name",
    "created",
    "-created",
    "deadline",
    "-deadline",
  ];
  const sortOrder =
    req.query.sort && availableSorts.includes(req.query.sort)
      ? req.query.sort
      : "-created";
  const filters = { userId: req.user._id };

  if (req.query.deadline === "isToday") {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    filters.deadline = {
      $gte: today,
      $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
    };
  }

  if (req.query.deadline === "isTomorrow") {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    filters.deadline = {
      $gte: tomorrow,
      $lt: new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000),
    };
  }

  if (req.query.deadline === "isThisWeek") {
    const currentDate = new Date();
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const dayAfterTomorrow = new Date(currentDate);
    dayAfterTomorrow.setHours(0, 0, 0, 0);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

    const lastDayOfWeek = new Date(currentDate);
    lastDayOfWeek.setHours(23, 59, 59, 999);
    lastDayOfWeek.setDate(lastDayOfWeek.getDate() + (6 - currentDate.getDay()));

    let deadlineGte = dayAfterTomorrow;
    if (currentDate.getDay() !== 5 || currentDate.getDay() !== 6)
      filters.deadline = {
        $gte: deadlineGte,
        $lte: lastDayOfWeek,
      };
  }

  if (req.query.deadline === "isNextWeek") {
    const nextWeekSunday = new Date();
    nextWeekSunday.setHours(0, 0, 0, 0);
    nextWeekSunday.setDate(
      nextWeekSunday.getDate() + (7 - nextWeekSunday.getDay())
    );

    const nextWeekSaturday = new Date(nextWeekSunday);
    nextWeekSaturday.setHours(23, 59, 59, 999);
    nextWeekSaturday.setDate(nextWeekSaturday.getDate() + 6);

    filters.deadline = {
      $gte: nextWeekSunday,
      $lte: nextWeekSaturday,
    };
  }

  if (req.query.deadline === "isOverdue") {
    const currentTime = new Date();
    filters.status = 0;
    filters.deadline = {
      $lte: currentTime,
    };
  }

  const statuses = ["isPending", "isCompleted"];
  if (statuses.includes(req.query.status)) {
    filters.status = statuses.indexOf(req.query.status);
  }
  if (req.query.page > 0) {
    match.page = req.query.page ? req.query.page : 1;
    match.limit = req.query.limit ? req.query.limit : 10;
    match.skip = (match.page - 1) * match.limit;
  }
  const todos = await Todo.find(filters)
    .sort(sortOrder)
    .skip(match.skip)
    .limit(match.limit);
  const totalCount = await Todo.countDocuments(filters);
  if (!todos) return res.send("Empty Todo List");
  res.send({
    total: totalCount,
    page: match.page,
    pageSize: todos.length,
    results: todos,
  });
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(200).send(error.details[0].message);

  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).send("No user exists with given user id");

  const todo = new Todo({
    name: req.body.name,
    userId: user._id,
    deadline: req.body.deadline,
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
