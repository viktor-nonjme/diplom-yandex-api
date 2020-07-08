const BadRequestError = require('./bad-request-error');
const NotFoundError = require('./not-found-error');
const UnauthorizedError = require('./unauthorized-error');
const ForbiddenError = require('./forbidden-error');
const ConflictError = require('./conflict-error');

module.exports = {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
};
