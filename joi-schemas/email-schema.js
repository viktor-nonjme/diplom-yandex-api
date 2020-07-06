const { Joi } = require('celebrate');

module.exports.emailSchema = Joi.string().required().email().messages({
  'string.empty': 'Пустое поле почты',
  'any.required': 'Поле почты обязательно',
  'string.email': 'Почта должна быть валидной'
});
