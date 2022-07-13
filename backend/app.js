require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');

const options = {
  origin: [
    'http://localhost:3000',
    'http://mesto.project.nomorepartiesxyz.ru',
    'https://mesto.project.nomorepartiesxyz.ru',
    'http://api.mesto.project.nomoredomains.xyz',
    'https://api.mesto.project.nomoredomains.xyz',
    'https://github.com/NataSmit',
  ],
  credentials: true, // эта опция позволяет устанавливать куки
};
const { PORT = 3001 } = process.env;

const app = express();
app.use('*', cors(options));
// app.use((req, res, next) => {
//  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
//  res.header('Access-Control-Allow-Credentials', 'true');
//
//  next();
// });
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

app.use((req, res, next) => {
  next(new NotFoundError('Путь не найден'));
});

app.use(errorLogger);

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
