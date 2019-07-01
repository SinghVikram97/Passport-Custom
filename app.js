const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Passport = require("./config/passport-setup");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const loginRoute = require("./routes/Login");
const profileRoute = require("./routes/Profile");
const logoutRoute = require("./routes/Logout");
const signupRoute = require("./routes/SignUp");
const otpRoute = require("./routes/Otp");
const forgotRoute = require("./routes/Forgot");
const resetRoute = require("./routes/Reset.js");

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  })
);

app.use(cookieParser("anything secret"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: "anything secret",
    resave: false,
    saveUninitialized: true
  })
);

app.use(Passport.initialize());
app.use(Passport.session());

app.use("/login", loginRoute);
app.use("/profile", profileRoute);
app.use("/logout", logoutRoute);
app.use("/signup", signupRoute);
app.use("/mobile", otpRoute);
app.use("/forgot", forgotRoute);
app.use("/reset", resetRoute);

app.get("/", (req, res) => {
  res.send("HI");
});

app.options("/", (req, res) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  res.set("Access-Control-Request-Method", "GET,PUT,POST,DELETE,OPTIONS");
  res.set("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Authorization", "vikramsinghbedi");
  res.status(200).send();
});

app.listen(4444, () => {
  console.log("Server started on http://localhost:4444");
});
