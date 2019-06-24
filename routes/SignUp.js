const route = require("express").Router();
const { User } = require("../mockdb");

route.get("/", (req, res) => {
  res.send("Sign up form");
});

route.post("/", (req, res) => {
  if (!req.body.username) {
    res.send("Can't create user with no username");
  }
  if (!req.body.password) {
    res.send("Can't create user with no password");
  }

  const username = req.body.username;
  const password = req.body.password;

  User.push({
    id: Math.random() * 10,
    username: username,
    password: password
  });

  res.redirect("/login");
});

module.exports = route;
