const passport = require('passport')
const ExtractJwt = require('passport-jwt').ExtractJwt
const JwtStrategy = require('passport-jwt').Strategy
const LocalStrategy = require('passport-local')
const User = require('../models/user')
const config = require('../config')

// Create local strategy
const localOptions = {
  usernameField: 'email'
}

const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  // Verify this email and password, call done with the user if it is the correct u/p
  // otherwise call done with false
  User.findOne({ email }, function(err, user) {
    if (err) { return done(err) }
    if (!user) { return done(null, false) }
    // compare passwords - is `password` === user.password?
    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err) }
      if (!isMatch) { return done(null, false) }

      return done(null, user)
    })
  })
})

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
}

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // See if the user ID in the payload exists in our database
  // If it does, call done with that user
  // Otherwise, call done without a user object
  User.findById(payload.sub, function(err, user) {
    // search failed
    if (err) { return done(err, false)}

    if (user) {
      // user exists, call done with the user payload and no error
      done(null, user)
    } else {
      // search completed but no user found
      done(null, false)
    }
  })
})

// Tell passport to use this strategy
passport.use(jwtLogin)
passport.use(localLogin)
