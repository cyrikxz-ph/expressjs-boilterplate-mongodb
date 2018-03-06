const httpCodes = require('./http-codes'),
  errorTypes = require('./error-types'),
  successTypes = require('./success-types')

/*
Response type:
    {
      success: 'true' or 'false',
      message: '',
      data: {}
    }
*/
const _make = (message, data) => {
  const payload = {
    message: message || responseTypes.DEFAULT_ERROR.message
  }

  if (data)
    payload.data = data

  return payload
}

const _error = (message, data) => {
  const payload = _make(message, data)
  payload.success = 'false'

  return payload
}

const _success = (message, data) => {
  const payload = _make(message, data)
  payload.success = 'true'

  return payload
}

const sendError = (res, errType, errData) => {
  if (errType instanceof errorTypes.InvalidTokenError) {
    return res.status(httpCodes.UNAUTHORIZED.code).json(_error(errType.message, errData))
  } else if (errType instanceof errorTypes.ValidationError) {
    return res.status(httpCodes.BAD_REQUEST.code).json(_error(errType.message, errData))
  } else if (errType instanceof errorTypes.UnauthorizedError) {
    return res.status(httpCodes.UNAUTHORIZED.code).json(_error(errType.message, errData))
  } else if (errType instanceof errorTypes.AuthenticationError) {
    return res.status(httpCodes.FORBIDDEN.code).json(_error(errType.message, errData))
  } else if (errType instanceof errorTypes.NotFoundError) {
    return res.status(httpCodes.NOT_FOUND.code).json(_error(errType.message, errData))
  } else if (errType instanceof errorTypes.DuplicateError) {
    return res.status(httpCodes.BAD_REQUEST.code).json(_error(errType.message, errData))
  } else if (errType instanceof errorTypes.UnknownError) {
    return res.status(httpCodes.BAD_REQUEST.code).json(_error(errType.message, errData))
  } else {
    return res.status(httpCodes.SERVER_ERROR.code).send(errType)
  }
}

const sendSuccess = (res, type, data) => {
  switch (type) {
  case successTypes.CREATED:
    return res.status(httpCodes.CREATED.code).json(_success(httpCodes.CREATED.message, data))
    break
  case successTypes.UPDATED:
    return res.status(httpCodes.OK.code).json(_success(httpCodes.OK.message, data))
    break
  case successTypes.DELETED:
    return res.status(httpCodes.OK.code).json(_success(httpCodes.OK.message, data))
    break
  default:
    return res.status(httpCodes.OK.code).json(_success(httpCodes.OK.message, data))
  }
}


module.exports = {
  sendError,
  sendSuccess
}
