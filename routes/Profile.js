const route = require("express").Router();
const passport = require("passport");

route.get("/", (req, res) => {
  if (!req.user) {
    res.redirect("/login");
  } else {
    res.send(req.user);
  }
});

route.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.redirect("/profile");
});

module.exports = route;
