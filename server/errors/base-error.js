module.exports = class BaseError extends Error {
  constructor (message) {
    // Calling parent constructor of base Error class.
    super(message)

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor)

    // Saving class name in the property of our custom error as a shortcut.
    this.name = this.constructor.name
  }
}
