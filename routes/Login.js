const route = require("express").Router();
const passport = require("passport");

route.get("/", (req, res) => {
  res.send("Send login page");
});

// Login via username password
route.post("/", passport.authenticate("local"), (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.redirect("/profile");
});

// Login via phone number
route.post(
  "/mobile",
  passport.authenticate("custom", {
    successRedirect: "/profile",
    failureRedirect: "/login"
  })
);

// Google login

route.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);

module.exports = route;
