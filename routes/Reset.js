const route = require("express").Router();
const nodemailer = require("nodemailer");
let { User } = require("../mockdb.js");
route.get("/:token", (req, res) => {
  res.send("Password reset page " + req.params.token);
});

route.post("/:token", (req, res) => {
  // Find user with given password reset token
  const token = req.params.token;
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
    User[index].password = req.body.password;
    User[index].resetPasswordToken = undefined;
    User[index].resetPasswordExpires = undefined;

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
      to: User[index].email,
      from: "vikram.bedi97@gmail.com",
      subject: "Your password has changed",
      text:
        "Hello,\n\n" +
        "This is a confirmation that the password for your account " +
        User[index].email +
        " has just been changed.\n"
    };

    transporter.sendMail(mailOptions, (err, info) => {
      res.send("Your password has changed");
    });
  }
});

module.exports = route;
