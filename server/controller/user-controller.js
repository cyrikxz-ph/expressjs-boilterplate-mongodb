const User = require('../models/user'),
  AccessToken = require('../models/acess-token'),
  successTypes = require('../helpers/success-types'),
  errorTypes = require('../helpers/error-types'),
  responseManager = require('../helpers/response-manager'),
  _ = require('lodash')

const logout = (req, res) => {
  const user = req.user,
    token = req.token

  AccessToken.remove({
    userId: user._id,
    token,
  })
    .then(() => {
      responseManager.sendSuccess(res, successTypes.OK, user)
    })
    .catch((err) => responseManager.sendError(res, err))

}

const changePassword = (req,res) => {
  const user = req.user
  const body = _.pick(req.body, ['oldPassword', 'newPassword'])

  if (!body.oldPassword || !body.newPassword) {
    responseManager.sendError(res, new errorTypes.ValidationError('old and new password are required'))
  }
  user.changePassword(body.oldPassword, body.newPassword)
    .then((user) => {
      responseManager.sendSuccess(res, successTypes.OK, user)
    })
    .catch((err) => responseManager.sendError(res, err))
}

module.exports = {
  logout,
  changePassword
}