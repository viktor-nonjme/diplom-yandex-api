const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors');

const { NODE_ENV, JWT_SECRET } = process.env;

const secretKey = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

module.exports.auth = (req, res, next) => {
  const { jwt: token } = req.cookies;
  if (!jwt) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  let payload;
  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};
