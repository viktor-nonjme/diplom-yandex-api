const { Joi } = require('celebrate');

module.exports.passwordSchema = Joi.string().required().min(8).messages({
  'any.required': 'Пароль обязателен',
  'string.empty': 'Поле пароля пустое',
  'string.min': 'Минимальная длинна пароля 8 симовлов'
});
