const express = require('express'),
  app = express(),
  // morgan = require('morgan'),
  cors = require('cors'),
  helmet = require('helmet'),
  bodyParser = require('body-parser'),
  routes = require('./routes'),
  methodOverride = require('method-override'),
  // { errorHandler, clientErrorHandler, logErrors } = require('./helpers/serverErrorHandler'),
  config = require('config').get('SERVER'),
  mongoose = require('./db/mongoose')

// console.log(config.get())
// app.use(morgan('common'))
app.use(cors())
app.use(helmet())

// parse application/json and look for raw text
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.text())
app.use(bodyParser.json({ type: 'application/json'}))
app.use(methodOverride())

// /*  Error handler */
// app.use(logErrors)
// app.use(clientErrorHandler)
// app.use(errorHandler)

/* Routes */
app.use('/api', routes)

/* Start Server */
app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}.`)
})

module.exports = app