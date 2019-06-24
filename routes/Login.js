const route = require("express").Router();
const passport = require("passport");

route.get("/", (req, res) => {
  res.send("Send login page");
});

// Login via username password
route.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login"
  })
);

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
