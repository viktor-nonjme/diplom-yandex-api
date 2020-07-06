const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');
const { UnauthorizedError } = require('../errors');

const User = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Введите email'],
    trim: true,
    unique: [true, 'Этот email адресс уже используется'],
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: 'Неправильный формат почты'
    }
  },
  password: {
    type: String,
    required: [true, 'Введите пароль'],
    minlength: [8, 'Минимальная длинна пароля 8 символов'],
    select: false
  },
  name: {
    type: String,
    required: [true, 'Введите ваше имя'],
    minlength: [2, 'Минимальная длинна имени 2 символа'],
    maxlength: [30, 'Максимальная длинна имени 30 символа']
  }
});

User.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неверный пароль или email');
      }

      return bcrypt.compare(password, user.password)
        .then((match) => {
          if (!match) {
            throw new UnauthorizedError('Неверный пароль или email');
          }

          return user;
        });
    });
};

User.plugin(uniqueValidator);

module.exports = mongoose.model('user', User);
