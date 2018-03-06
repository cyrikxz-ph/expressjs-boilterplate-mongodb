const mongoose = require('mongoose'),
  config = require('config').get('DB')

mongoose.Promise = global.Promise
mongoose.connect(config.MONGO_URI)
module.exports = mongoose