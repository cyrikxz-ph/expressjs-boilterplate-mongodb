const router = require('express').Router(),
  // errorTypes = require('../helpers/error-types'),
  // responseManager = require('../helpers/response-manager'),
  authController = require('../controller/auth-controller')

// Route specific Middleware: Validating the request
// router.use((req, res, next) => {
//   if (!('name' in req.body) || !('password' in req.body))
//     return responseManager.sendError(res, new errorTypes.ValidationError('\'name\' or \'password\' is missing'))

//   next()
// })

/** *************** User Authentication routes, considering '/' as base, relative to '/auth' ***************************/
router.route('/login').post(authController.login)
router.route('/register').post(authController.register)

module.exports = router