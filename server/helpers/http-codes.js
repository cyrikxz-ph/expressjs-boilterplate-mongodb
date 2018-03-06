/* HTTP RESPONSE STATUS codes */
module.exports = {
  OK: {
    code: 200,
    message: 'Successful!'
  },
  CREATED: {
    code: 201,
    message: 'Resource created successfully!'
  },
  BAD_REQUEST: {
    code: 400,
    message: 'Something went wrong!'
  },
  UNAUTHORIZED: {
    code: 401,
    message: 'Sorry! you are not authorized to do this request'
  },
  FORBIDDEN: {
    code: 403,
    message: 'Invalid access!'
  },
  NOT_FOUND: {
    code: 404,
    message: 'Resource not found!'
  },
  SERVER_ERROR: {
    code: 500,
    message: 'Server failed to handle the request!'
  }
}
