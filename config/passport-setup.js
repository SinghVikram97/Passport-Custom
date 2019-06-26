const Passport = require("passport");
const LocalStratergy = require("passport-local").Strategy;
const GoogleStratergy = require("passport-google-oauth2");
const CustomStratergy = require("passport-custom");
const { User } = require("../mockdb");

Passport.serializeUser((user, done) => {
  console.log("user", user);
  done(null, user.id);
});

Passport.deserializeUser((id, done) => {
  for (let i = 0; i < User.length; i++) {
    if (User[i].id === id) {
      console.log(User[i]);
      done(null, User[i]);
    }
  }
});

Passport.use(
  new LocalStratergy((username, password, done) => {
    console.log(username);
    let found = false;
    for (let i = 0; i < User.length; i++) {
      if (User[i].username === username) {
        found = true;
        // Check password
        if (User[i].password === password) {
          done(null, User[i]);
        } else {
          done(null, false);
        }
      }
    }
    if (!found) {
      done(null, false);
    }
  })
);

Passport.use(
  new CustomStratergy((req, done) => {
    let found = false;
    for (let i = 0; i < User.length; i++) {
      console.log(User[i].phoneNumber, req.body.phoneNumber);
      if (User[i].phoneNumber === req.body.phoneNumber) {
        console.log("Yes");
        found = true;
        done(null, User[i]);
      }
    }
    if (!found) {
      done(null, false);
    }
  })
);

Passport.use(
  new GoogleStratergy(
    {
      callbackURL: "/profile/google/redirect",
      clientID:
        "87837198098-ourd2c8o8k3u7ju0vr7u2juj2i7ke3m.apps.googleusercontent.com",
      clientSecret: "ORHLub2zYeCuUIhBpFZas6UG"
    },
    (accessToken, refreshToken, profile, done) => {
      // Check if user already exists in our db
      let found = false;
      for (let i = 0; i < User.length; i++) {
        if (User[i].googleId === profile.id) {
          found = true;
          done(null, User[i]);
        }
      }
      if (found === false) {
        // Insert into db
        User.push({
          username: profile.displayName,
          googleId: profile.id
        });

        done(null, User[User.length - 1]);
      }
    }
  )
);

module.exports = Passport;
