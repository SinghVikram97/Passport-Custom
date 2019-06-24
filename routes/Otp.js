const route = require("express").Router();
const Nexmo = require("nexmo");
const passport = require("passport");

const nexmo = new Nexmo({
  apiKey: "f32d7883",
  apiSecret: "EHfIvhEFeS05TGP0"
});

route.get("/", (req, res) => {
  res.send("Otp login page");
});

route.post("/register", (req, res) => {
  nexmo.verify.request(
    {
      number: "919650498659",
      brand: "Nexmo",
      code_length: "4"
    },
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

route.post("/verify", (req, res) => {
  let pin = req.body.pin;
  let reqId = req.body.reqId;
  console.log(pin);

  nexmo.verify.check(
    {
      request_id: reqId,
      code: pin
    },
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        if (result && result.status === "0") {
          req.login(
            {
              username: "vikram",
              password: "test1"
            },
            err => {
              if (err) {
                console.log("Yes");

                res.send(err);
              } else {
                res.redirect("/profile");
              }
            }
          );
        } else {
          res.send("Invalid code or to many tries");
        }
      }
    }
  );
});

module.exports = route;
