const router = require('express').Router(),
  responseManager = require('../helpers/response-manager'),
  userRoutes = require('./users'),
  authRoutes = require('./auth')

// Base Route for the Application (Can be deleted or comment out, if not needed)
router.route('/').get((req,res) => {
  res.json({
    message: 'Welcome to Express API Server',
    upTime: process.uptime(),
  })
})

router.use('/', authRoutes)
router.use('/users', userRoutes)

// Not Found Rounte
router.use('*', (req, res) => {
  responseManager.sendError(res,
    {
      message: 'invalid route',
      success: false
    })
})

module.exports = router