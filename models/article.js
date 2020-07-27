const mongoose = require('mongoose');
const validator = require('validator');

const Article = new mongoose.Schema({
  keyword: {
    type: String,
    minlength: [2, 'Ключевое слово должно быть длиннее 2 символов'],
    required: [true, 'Введите ключевое слово'],
  },
  title: {
    type: String,
    minlength: [2, 'Заголовок должен быть длиннее 2 символов'],
    required: [true, 'Введите заголовок'],
  },
  text: {
    type: String,
    minlength: [2, 'Текст должен быть длиннее 2 символов'],
    required: [true, 'Введите текст'],
  },
  date: {
    type: String,
    minlength: 2,
    required: [true, 'Дата статьи обязательна'],
  },
  source: {
    type: String,
    minlength: [2, 'Источник должен быть длиннее 2 символов'],
    required: [true, 'Введите источник'],
  },
  link: {
    type: String,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
    },
    required: [true, 'Ссылка на статью обязательна'],
  },
  image: {
    type: String,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
    },
    required: [true, 'Ссылка на картинку обязательна'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    select: false,
    required: true,
  },
});

module.exports = mongoose.model('article', Article);
