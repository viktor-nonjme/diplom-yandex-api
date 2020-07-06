const { ObjectId } = require('mongodb');
const { BadRequestError } = require('../errors');

module.exports.verifyArticleObjectId = (req, res, next) => {
  if (ObjectId.isValid(req.params.id)) {
    return next();
  }
  return next(new BadRequestError('Невалидный id'));
};

module.exports.verifyUserObjectId = (req, res, next) => {
  if (ObjectId.isValid(req.user._id)) {
    return next();
  }
  return next(new BadRequestError('Невалидный id'));
};
