const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  AccessToken = require('./acess-token'),
  errorTypes = require('../helpers/error-types'),
  validator = require('validator'),
  config = require('config').get('SERVER'),
  _ = require('lodash'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcryptjs')

const userSchema = new Schema({
  email: {
    type: String,
    required: '{PATH} is required',
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: '{PATH} is required',
    minlength: 6
  },
  tokens: [{
    type: Schema.Types.ObjectId,
    ref: 'AccessToken'
  }]
},
{
  timestamps: true
})

userSchema.methods.generateAuthToken = function () {
  const user = this,
    access = 'auth',
    token = jwt.sign(
      {
        _id: user._id.toHexString(),
        access
      },
      config.JWT_SECRET
    ).toString()

  const accessToken = new AccessToken({
    access,
    token,
    userId: user._id,
  })

  return accessToken.save()
    .then(() => {
      return token
    })
}

userSchema.methods.changePassword = function (oldPassword, newPassword) {
  const user = this

  return bcrypt.compare(oldPassword, user.password)
    .then((res) => {
      if (res) {
        return user
      } else {
        throw new errorTypes.ValidationError('invalid old password')
      }
    })
    .then((user) => {
      user.password = newPassword
      return user.save()
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

userSchema.methods.removeToken = function (token) {
  const user = this
  return AccessToken.remove({
    userId: user._id,
    token
  })
}

userSchema.methods.toJSON = function () {
  return _.pick(this, ['_id', 'email'])
}

userSchema.statics.findByToken = function (token) {
  const User = this
  let decoded

  try {
    decoded = jwt.verify(token, config.JWT_SECRET)
  } catch (e) {
    return Promise.reject()
  }

  return AccessToken.findOne({
    userId: decoded._id,
    token,
    'access': 'auth'
  })
    .then((accessToken) => {
      return User.findOne({ _id: accessToken.userId })
    })
}


userSchema.statics.findByCredentials = function (email, password) {
  const User = this

  return User.findOne({email})
    .then((user) => {
      if (!user) {
        throw new errorTypes.AuthenticationError('Invalid Username/Password')
      }

      return bcrypt.compare(password, user.password)
        .then((res) => {
          if (res) {
            return user
          } else {
            throw new errorTypes.AuthenticationError('Invalid Username/Password')
          }
        })
    }).catch((e) => Promise.reject(e))
}

userSchema.pre('save', function (next) {
  const user = this
  if (user.isModified('password')) {

    bcrypt.hash(user.password, 10)
      .then((result) => {
        user.password = result
        next()
      })
  }
  else {
    next()
  }
})

module.exports = mongoose.model('User', userSchema)
