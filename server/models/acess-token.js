const mongoose = require('mongoose'),
  Schema = mongoose.Schema


const accessTokenSchema = new Schema({
  access: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
})


module.exports = mongoose.model('AccessToken', accessTokenSchema)