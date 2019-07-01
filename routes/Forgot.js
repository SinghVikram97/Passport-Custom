const route = require("express").Router();
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const { User } = require("../mockdb");

route.get("/", (req, res) => {
  res.send("Send forgot password page");
});

route.post("/", (req, res) => {
  crypto.randomBytes(20, (err, buf) => {
    let token = buf.toString("hex");
    let email = req.body.email;

    // Find user with given email
    let found = false;
    let index = -1;

    for (let i = 0; i < User.length; i++) {
      if (User[i].username === email) {
        found = true;
        index = i;
        break;
      }
    }

    if (!found) {
      res.send("No user found with given email");
      // res.redirect('/logout')
    }

    User[index].resetPasswordToken = token;
    User[index].resetPasswordExpires = Date.now() + 3600000; // 1 hour

    console.log(User[index]);

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
      to: email,
      from: "vikram.bedi97@gmail.com",
      subject: "Password Reset Request",
      text:
        "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
        "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
        "http://" +
        req.headers.host +
        "/forgot/" +
        token +
        "\n\n" +
        "If you did not request this, please ignore this email and your password will remain unchanged.\n"
    };

    transporter.sendMail(mailOptions, (err, info) => {
      res.send(
        "An e-mail has been sent to " + email + " with further instructions."
      );
    });
  });
});

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
    res.send("Redirecting to password reset page");
  }
});

module.exports = route;
