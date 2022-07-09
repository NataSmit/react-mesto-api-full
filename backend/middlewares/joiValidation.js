const { celebrate, Joi } = require('celebrate');
const { linkRegexValidator } = require('../regex/linkValidation');

module.exports.userCreationValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().allow('').min(2).max(30),
    about: Joi.string().allow('').min(2).max(30),
    avatar: Joi.string().allow('').pattern(linkRegexValidator),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.cardCreationValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().pattern(linkRegexValidator),
  }),
});

module.exports.updateUserInfoValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

module.exports.updateAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(linkRegexValidator),
  }),
});

module.exports.userIdValidation = celebrate({
  params: Joi.object({
    userId: Joi.string().hex().min(24).max(24),
  }),
});

module.exports.cardIdValidation = celebrate({
  params: Joi.object({
    cardId: Joi.string().hex().min(24).max(24),
  }),
});
