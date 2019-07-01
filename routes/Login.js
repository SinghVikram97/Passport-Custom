const route = require("express").Router();
const passport = require("passport");
const cors = require("cors");

route.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "OPTIONS"]
  })
);

route.get("/", (req, res) => {
  res.send("Send login page");
});

route.post("/", (req, res) => {
  if (req.body.password) {
    res.redirect(307, "/login/email");
  } else {
    res.redirect(307, "/mobile/register");
  }
});

// Login via username password
route.post(
  "/email",
  passport.authenticate("local", {
    failureRedirect: "http://localhost:3001/sign-in"
  }),

  (req, res) => {
    res.set("Access-Control-Allow-Origin", "http://localhost:3000");
    res.set("Access-Control-Request-Method", "GET,PUT,POST,DELETE,OPTIONS");
    res.set("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Allow-Credentials", true);
    res.set("Authorization", "vikramsinghbedi");
    res.redirect("http://localhost:3001/profile");
  }
);

route.options("/", (req, res) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  res.set("Access-Control-Request-Method", "GET,PUT,POST,DELETE,OPTIONS");
  res.set("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Allow-Credentials", true);
  res.set("Authorization", "vikramsinghbedi");
  res.status(200).send();
});

// Login via phone number
route.post(
  "/mobile",
  passport.authenticate("custom", {
    successRedirect: "http://localhost:3000/profile",
    failureRedirect: "http://localhost:3000/sign-in"
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
