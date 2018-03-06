const BaseError = require('./base-error')

module.exports = class UnknownError extends BaseError {
  constructor (message) {
    // Providing default message and overriding status code.
    super(message)
  }
}
