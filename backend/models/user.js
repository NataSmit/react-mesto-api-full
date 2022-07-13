const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const { linkRegexValidator } = require('../regex/linkValidation');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v) => linkRegexValidator.test(v),
      message: 'Неправильный формат url',
    },

  },
  email: {
    type: String,
    unique: true,
    requied: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    requied: true,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
