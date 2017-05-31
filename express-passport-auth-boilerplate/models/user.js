const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const Schema = mongoose.Schema

// Define user model
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true // ensure unique is not tripping on case sensitive values
  },
  password: String
})

// On save hook, encrypt password
userSchema.pre('save', function(next) {
  // Context of function is user model
  const user = this

  // generate a salt, then run callback
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err) }

    // hash (encrypt) our password using the salt, then run callback
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        return next(err)
      }

      // overwrite plain text password with encrypted password
      user.password = hash

      // go ahead and save the model
      next()
    })
  })
})

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err) }
    callback(null, isMatch)
  })
}

// Create the model class
const ModelClass = mongoose.model('user', userSchema)

// Export the model
module.exports = ModelClass
