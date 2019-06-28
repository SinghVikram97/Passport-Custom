const route = require("express").Router();
const passport = require("passport");

route.get("/", (req, res) => {
  req.logout();
  res.redirect("http://localhost:3000/sign-in");
});

module.exports = route;
