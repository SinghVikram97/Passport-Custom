const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Passport = require("./config/passport-setup");
const session = require("express-session");

const loginRoute = require("./routes/Login");
const profileRoute = require("./routes/Profile");
const logoutRoute = require("./routes/Logout");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({ secret: "anything secret", resave: false, saveUninitialized: true })
);

app.use(Passport.initialize());
app.use(Passport.session());

app.use("/login", loginRoute);
app.use("/profile", profileRoute);
app.use("/logout", logoutRoute);

app.get("/", (req, res) => {
  res.send("HI");
});

app.listen(4444, () => {
  console.log("Server started on http://localhost:4444");
});
