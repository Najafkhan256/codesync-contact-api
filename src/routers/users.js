const express = require("express");
const Users = require("../models/users");

const router = new express.Router();

router.post("/users", async (req, res) => {
  try {
    const user = new Users(req.body);
    const createUser = await user.save();
    res.status(201).send(createUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/users", async (req, res) => {
  const pageNumber = Number(req.query.page);
  const limitNumber = Number(req.query.limit);

  let page = pageNumber || 1;
  let limit = limitNumber || 30;

  let skip = (page - 1) * limit;

  try {
    const allUsers = await Users.find();
    const usersData = await Users.find().skip(skip).limit(limit);
    let nextPage = allUsers.length - skip > usersData.length ? page + 1 : null;
    res.send({ usersData, totalUsers: allUsers.length, nextPage: nextPage });
  } catch (err) {
    res.send(err);
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const getUser = await Users.findById(_id);
    if (!getUser) {
      res.status(404).send();
    } else {
      res.send(getUser);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch("/users/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateUser = await Users.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!updateUser) {
      res.status(404).send();
    } else {
      res.send(updateUser);
    }
  } catch (err) {
    res.status(404).send(err);
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const deleteUser = await Users.findByIdAndDelete(_id);
    if (!_id) {
      res.status(404).send();
    } else {
      res.send(deleteUser);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
