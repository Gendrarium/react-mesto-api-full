const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { validateCreateUser, validateLoginUser } = require('./middlewares/validatons');
const cards = require('./routes/cards');
const users = require('./routes/users');
const { login, createUser } = require('./controllers/users');
const errorHandler = require('./middlewares/error-handler');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-error');

const { PORT = 3000 } = process.env;
const CORS_WHITELIST = ['http://localhost:3000/', 'https://gendrarium.nomoredomains.monster/'];
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const corsOption = {
  credentials: true,
  origin: function checkCorsList(origin, callback) {
    if (CORS_WHITELIST.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOption));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use('/signup', validateCreateUser, createUser);
app.use('/signin', validateLoginUser, login);
app.use(auth);

app.use(users);
app.use(cards);

app.use((req, res, next) => {
  next(new NotFoundError('Неверный адрес запроса!'));
});
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
});
