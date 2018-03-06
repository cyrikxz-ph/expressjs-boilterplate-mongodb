const User = require('../models/user'),
  errorTypes = require('../helpers/error-types'),
  responseManager = require('../helpers/response-manager')

module.exports = authenticate = (req, res, next) => {
  const token = req.header('X-Auth-Token')

  User.findByToken(token)
    .then((user) => {
      if (!user){
        return Promise.reject()
      }

      req.user = user
      req.token = token
      next()
    })
    .catch((e) => responseManager.sendError(res, new errorTypes.UnauthorizedError('authentication requried!')))
}