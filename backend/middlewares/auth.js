const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

const SECRET_KEY = 'some-secret-key';

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  if (!req.cookies) {
    return new Unauthorized('Пользователь не авторизован');
  }

  const token = req.cookies.jwt;
  // eslint-disable-next-line no-console
  console.log(token);
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    next(new Unauthorized('Пользователь не авторизован'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  // eslint-disable-next-line no-console
  console.log(payload);
  next();
};
