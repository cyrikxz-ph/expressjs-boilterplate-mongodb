const BaseError = require('./base-error')

module.exports = class UnauthorizedError extends BaseError {
  constructor (message) {
    // Providing default message and overriding status code.
    super(message)
  }
}
