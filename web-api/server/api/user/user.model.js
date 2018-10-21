const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')

// // // //

// Password encryption helper function
function encryptPassword (password) {
    return crypto.createHmac('sha1', process.env.PASSWORD_ENCRYPTION_SECRET)
    .update(password)
    .digest('base64')
}

const collection_options = {
  timestamps: {
    createdAt: 'createdOn',
    updatedAt: 'updatedOn'
  },
  versionKey: false
}

const userAttributes = {
  username: {
      type: String,
      required: true
  },
  email: {
      type: String,
      required: true
      // TODO - email validation
  },
  password: {
      type: String,
      required: true
  },
  password_reset_token: {
      type: String
  },
  admin: {
      type: Boolean,
      default: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  roles: [{
    type: String,
    required: false,
    unique: false
  }],

}

// // // //

const User = new Schema(userAttributes, collection_options);

// // // //

// Create new User document
// TODO - add email
User.statics.create = function ({ name, email, username, password }) {

    // Instantiates new User model
    const user = new this({
        name,
        email,
        username,
        password: encryptPassword(password)
    })

    // Return User.save() Promise
    return user.save()
}

// findOneByUsername
// Find one User by username
User.statics.findOneByUsername = function (username) {
    // Executes MongoDb query
    return this.findOne({ username }).exec()
}

// verify
// Verifies the password parameter of POST /auth/login requests
User.methods.verify = function (password) {
    // Verifies saved password against a request's password
    return this.password === encryptPassword(password)
}

// assignAdmin
// Assigns admin priviledges to a user
User.methods.assignAdmin = function () {
    // Assigns true to `admin` attribute
    this.admin = true

    // Returns `save` Promise
    return this.save()
}


// TODO - absract schema.class_name
module.exports = mongoose.model('User', User)
