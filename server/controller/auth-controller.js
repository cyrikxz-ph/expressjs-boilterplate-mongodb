const User = require('../models/user'),
  successTypes = require('../helpers/success-types'),
  errorTypes = require('../helpers/error-types'),
  responseManager = require('../helpers/response-manager'),
  _ = require('lodash')

const login = (req, res) => {
  const body = _.pick(req.body, ['email', 'password'])

  User.findByCredentials(body.email, body.password)
    .then((user) => {
      return user.generateAuthToken()
    })
    .then((token) => {
      console.log
      res.header('X-Auth-Token', token)
      responseManager.sendSuccess(res, successTypes.OK)
    })
    .catch((err) => responseManager.sendError(res, err))
}

const register = (req, res) => {
  const body = _.pick(req.body, ['email','password'])
  const user = new User(body)

  user.save()
    .then((user) => {
      return user.generateAuthToken()
    })
    .then((token) => {
      res.header('X-Auth-Token', token)
      responseManager.sendSuccess(res, successTypes.OK, user)
    })
    .catch((err) => {
      if (err.code === 11000 ) {
        responseManager.sendError(res, new errorTypes.DuplicateError('email already exists'))
      }
      else {
        responseManager.sendError(res, err)
      }
    })
}

module.exports = {
  register,
  login
}