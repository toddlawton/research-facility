const User = require('../models/user')
const jwt = require('jwt-simple')
const config = require('../config')

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  // sub === subject
  // iat === issued at time
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}

exports.signin  = (req, res, next) => {
  // User has already had their email and password auth'd
  // We just need to give them a token
  res.send({ token: tokenForUser(req.user) })
}

exports.signup = (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'})
  }

  // See if a user with a given email exists
  User.findOne({ email }, (err, existingUser) => {
    if (err) {
      return next(err)
    }

    // If a user with an email does exist, return an Error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use'})
    }

    // If a user with an email does not exist, create and save user record
    const user = new User({ email, password })

    user.save(function(err) {
      if (err) {
        return next(err)
      }

      // Respond to request indicating the user was created
      res.json({ token: tokenForUser(user) })
    })
  })

}
