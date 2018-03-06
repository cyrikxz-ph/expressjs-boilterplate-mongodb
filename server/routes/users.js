const router = require('express').Router(),
  // errorTypes = require('../helpers/error-types'),
  // responseManager = require('../helpers/response-manager'),
  userController = require('../controller/user-controller'),
  authenticate = require('../middleware/authenticate')

// Route specific Middleware: Validating the request
router.use(authenticate)

/** *************** User Authentication routes, considering '/' as base, relative to '/auth' ***************************/
router.route('/logout').post(userController.logout)
router.route('/change-password').post(userController.changePassword)
// router.route('/register').post(userController.register)

module.exports = router