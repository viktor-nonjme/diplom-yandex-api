const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { BadRequestError, NotFoundError } = require('../errors');

const { NODE_ENV, JWT_SECRET } = process.env;

const secretKey = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

const login = (req, res, next) => {
  User.findUserByCredentials(req.body.email, req.body.password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, secretKey);

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true
      });

      res
        .status(200)
        .send({ message: 'Авторизация прошла успешно' });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { email, name, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, name, password: hash }))
    .then((user) => {
      res.status(201).send({
        _id: user._id,
        email: user.email,
        name: user.name
      });
    })
    .catch((err) => next(new BadRequestError(err.message)));
};

const getUser = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => res.send(user))
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports = {
  getUser,
  createUser,
  getUsers,
  login
};
