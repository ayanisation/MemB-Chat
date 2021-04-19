const express = require("express");
const AuthModel = require("../models/authmodel");
const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const router = new express.Router();

router.get("/", (req, res) => {
  AuthModel.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((e) => {
      res.status(404).json({ error: e });
    });
});

router.post("/signup", async (req, res) => {
  try {
    const exists = await AuthModel.findOne({ username: req.body.username });
    if (exists) res.status(400).json({ error: "Username is taken" });
    else {
      const newUser = new AuthModel(req.body);
      await newUser.generateAuthToken();
      res.status(201).json(newUser);
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await AuthModel.findOne({ username });
    if (!user) res.status(404).json({ error: "User not found" });
    else {
      const isCorrect = await bcrypt.compare(password, user.password);
      if (!isCorrect) res.status(400).json({ error: "Incorrect password" });
      else {
        await user.generateAuthToken();
        res.status(200).json(user);
      }
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;
