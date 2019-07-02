const route = require("express").Router();
const nodemailer = require("nodemailer");
let { User } = require("../mockdb.js");

route.get("/:token", (req, res) => {
  const token = req.params.token;

  // Find user with given password reset token

  let index = -1;
  for (let i = 0; i < User.length; i++) {
    if (User[i].resetPasswordToken === token) {
      index = i;
      break;
    }
  }
  if (index == -1) {
    res.send("Invalid request");
  } else {
    req.session.tokenMsg = token;
    res.redirect(`http://localhost:3000/reset`);
  }
});

route.post("/", (req, res) => {
  // Find user with given password reset token
  const token = req.session.tokenMsg;
  let index = -1;
  for (let i = 0; i < User.length; i++) {
    if (User[i].resetPasswordToken === token) {
      req.session.tokenMsg = undefined;
      index = i;
      break;
    }
  }
  if (index == -1) {
    res.send("Invalid request");
  } else {
    console.log(req.body.password);
    User[index].password = req.body.password;
    User[index].resetPasswordToken = undefined;
    User[index].resetPasswordExpires = undefined;
    req.session.tokenMsg = undefined;

    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: "vikram.bedi97@gmail.com",
        pass: "iafbedi123"
      }
    });

    let mailOptions = {
      to: User[index].username,
      from: "vikram.bedi97@gmail.com",
      subject: "Password Changed",
      text: "Hi your password has been changed please sign in again to confirm"
    };

    transporter.sendMail(mailOptions, (err, info) => {
      res.redirect("http://localhost:3000/sign-in");
    });
  }
});

module.exports = route;
