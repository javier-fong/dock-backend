const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ email }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false, { message: 'Email is not registered' });
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password is incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
    console.log(`serial with ${user._id}`)
  });

  passport.deserializeUser(async (id, cb) => {
    await User.findById(id, (err, user) => {
      console.log('line 31',user._id)
      console.log('line 32',id)
      console.log(`deserial with ${id}`)
      return cb(null, user);
    });
  });
};