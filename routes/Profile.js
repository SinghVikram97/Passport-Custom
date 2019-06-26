const route = require("express").Router();
const passport = require("passport");

route.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  console.log("req", req);
  console.log(req.user);
  if (!req.user) {
    // res.redirect("/login");
    res.json("Hi");
  } else {
    console.log(req.user);
    res.json(req.user);
  }
});

route.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.redirect("/profile");
});

module.exports = route;
