import type { Request, Response, NextFunction } from "express";

import BadRequestError from "../errors/bad-request-error";
import ForbiddenError from "../errors/forbidden-error";
import NotFoundError from "../errors/not-found-error";
import Card from "../models/card";

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find({})
    .populate("owner")
    .then((cards) => res.send(cards))
    .catch((err) => {
      next(err);
    });
};

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user!._id }, )
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Введите корректные данные!"));
      } else {
        next(err);
      }
    });
};

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  Card.findById(req.params.cardId)
    .then((data) => {
      if (!data) {
        next(new NotFoundError("Карточка по данному id не найдена."));
      } else if (!data.owner.equals(req.user!._id)) {
        next(new ForbiddenError("Нельзя удалить чужую карточку!"));
      } else {
        Card.findByIdAndRemove(req.params.cardId)
          .then((card) => {
            if (!card) {
              next(new NotFoundError("Карточка по данному id не найдена."));
            } else {
              res.send(card);
            }
          })
          .catch((err: Error) => {
            if (err.name === "CastError") {
              next(new BadRequestError("Некорректно введены данные."));
            } else {
              next(err);
            }
          });
      }
    })
    .catch(next);
};

export const likeCard = (req: Request, res: Response, next: NextFunction) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user!._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        next(new NotFoundError("Карточка по данному id не найдена."));
      } else {
        res.send(card);
      }
    })
    .catch((err: Error) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Введите корректный id!"));
      } else {
        next(err);
      }
    });
};

export const dislikeCard = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user!._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        next(new NotFoundError("Карточка по данному id не найдена."));
      } else {
        res.send(card);
      }
    })
    .catch((err: Error) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Введите корректный id!"));
      } else {
        next(err);
      }
    });
};
