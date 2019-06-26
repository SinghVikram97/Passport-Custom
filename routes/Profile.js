const route = require("express").Router();
const passport = require("passport");
const cors = require("cors");

const axios = require("axios");

route.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  })
);

route.get("/", (req, res) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  res.set("Access-Control-Request-Method", "GET,PUT,POST,DELETE,OPTIONS");
  res.set("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Allow-Credentials", true);
  res.set("Authorization", "vikramsinghbedi");
  console.log("USER", req.user);
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
