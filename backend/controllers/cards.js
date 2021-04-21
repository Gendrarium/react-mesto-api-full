const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-error');
const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('user')
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Введите корректные данные!'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((data) => {
      if (!data) {
        next(new NotFoundError('Карточка по данному id не найдена.'));
      } else if (!data.owner.equals(req.user._id)) {
        next(new ForbiddenError('Нельзя удалить чужую карточку!'));
      } else {
        Card.findByIdAndRemove(req.params.cardId)
          .then((card) => {
            if (!card) {
              next(new NotFoundError('Карточка по данному id не найдена.'));
            } else {
              res.send(card);
            }
          })
          .catch((err) => {
            if (err.name === 'CastError') {
              next(new BadRequestError('Некорректно введены данные.'));
            } else {
              next(err);
            }
          });
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка по данному id не найдена.'));
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Введите корректный id!'));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true })
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка по данному id не найдена.'));
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Введите корректный id!'));
      } else {
        next(err);
      }
    });
};
