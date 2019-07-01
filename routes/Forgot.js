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
    console.log(req.body);
    let { email } = req.body;

    console.log("Email", email);

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
      return res.redirect("http://localhost:3001/forgot");
    }
    console.log("HI");
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
        "/reset/" +
        token +
        "\n\n" +
        "If you did not request this, please ignore this email and your password will remain unchanged.\n"
    };

    transporter.sendMail(mailOptions, (err, info) => {
      res.redirect("http://localhost:3001/resetMsg");
    });
  });
});

module.exports = route;
