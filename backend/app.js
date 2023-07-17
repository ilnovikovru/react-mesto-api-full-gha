require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/user');
const userRoutes = require('./routes/user');
const cardRoutes = require('./routes/card');
const auth = require('./middlewares/auth');
const { signinValidation, signupValidation } = require('./validators');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const NotFoundError = require('./errors/NotFoundError');

const app = express();

app.use(cors());

app.use(express.json());

app.use(requestLogger);

// const allowedCors = [
//   'https://ilnovikovru.nomoredomains.work',
// ];

// app.use((req, res, next) => {
//   const { origin, method } = req;
//   const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
//   const requestHeaders = req.headers['access-control-request-headers'];

//   if (allowedCors.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', '*');
//   }

//   if (method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
//     res.header('Access-Control-Allow-Headers', requestHeaders);
//     return res.status(200).end();
//   }

//   return next();
// });

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/api/signin', signinValidation, login);
app.post('/api/signup', signupValidation, createUser);

app.use(auth);
app.use(userRoutes);
app.use(cardRoutes);

app.use(errorLogger);

// eslint-disable-next-line no-unused-vars
app.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
});

mongoose.connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/mestodb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Слушаю порт ${port}`);
    });
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log(`Error connecting to database: ${err}`);
  });
