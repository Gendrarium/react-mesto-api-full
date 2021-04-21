const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const BadRequestError = require('../errors/bad-request-error');
const UnauthorizedError = require('../errors/unauthorized-error');
const NotFoundError = require('../errors/not-found-error');
const ConflictingRequestError = require('../errors/conflicting-request-error');
const User = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь по данному id не найден.'));
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('Пользователь не найден!'));
      } else {
        next(err);
      }
    });
};

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь по данному id не найден.'));
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('Пользователь не найден!'));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  const testUser = new User({
    email,
    password,
  });
  testUser.validate((error) => {
    if (error) {
      next(new BadRequestError('Введите корректные данные!'));
    } else {
      bcrypt.hash(password, 10)
        .then((hash) => {
          User.create({
            name, about, avatar, email, password: hash,
          })
            .then((user) => res.status(201).send({ data: user.toJSON() }))
            .catch((err) => {
              if (err.code === 11000) {
                next(new ConflictingRequestError('Пользователь с таким email уже есть в базе!'));
              } else if (err.name === 'ValidationError') {
                next(new BadRequestError('Введите корректные данные!'));
              } else {
                next(err);
              }
            });
        });
    }
  });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'some-secret-key',
        { expiresIn: '7d' },
      );
      res.cookie('token', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      }).send({ user: user.toJSON() });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new UnauthorizedError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.logout = (req, res, next) => {
  if (!req.cookies.token) {
    res.clearCookie('token').send();
  } else {
    next(new BadRequestError('Некорректный запрос'));
  }
};


module.exports.editProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about },
    {
      new: true,
      runValidators: true,
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Введите корректные данные!'));
      } else if (err.name === 'CastError') {
        next(new NotFoundError('Пользователь не найден!'));
      } else {
        next(err);
      }
    });
};

module.exports.editAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar },
    {
      new: true,
      runValidators: true,
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Введите корректные данные!'));
      } else if (err.name === 'CastError') {
        next(new NotFoundError('Пользователь не найден!'));
      } else {
        next(err);
      }
    });
};
