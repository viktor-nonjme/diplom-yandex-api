require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const routes = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message
  });
});

app.use('/api', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT);

const { NODE_ENV, DATABASE_URL } = process.env;

const dataBaseUrl = NODE_ENV === 'production' ? DATABASE_URL : 'mongodb://localhost:27017/diplombd';

mongoose.connect(dataBaseUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
