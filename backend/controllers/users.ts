import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import type { Request, Response, NextFunction } from "express";

import BadRequestError from "../errors/bad-request-error";
import UnauthorizedError from "../errors/unauthorized-error";
import NotFoundError from "../errors/not-found-error";
import ConflictingRequestError from "../errors/conflicting-request-error";
import User, { IUser } from "../models/user";

const { NODE_ENV, JWT_SECRET } = process.env;

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then((users: IUser[]) => res.send(users))
    .catch(next);
};
export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        next(new NotFoundError("Пользователь по данному id не найден."));
      } else {
        res.send(user);
      }
    })
    .catch((err: Error) => {
      if (err.name === "CastError") {
        next(new NotFoundError("Пользователь не найден!"));
      } else {
        next(err);
      }
    });
};

export const getUserMe = (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.user)
    .then((user) => {
      if (!user) {
        next(new NotFoundError("Пользователь по данному id не найден."));
      } else {
        res.send(user);
      }
    })
    .catch((err: Error) => {
      if (err.name === "CastError") {
        next(new NotFoundError("Пользователь не найден!"));
      } else {
        next(err);
      }
    });
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar, email, password } = req.body;

  const testUser = new User({
    email,
    password,
  });
  testUser.validate().then(
    () => {
      bcrypt.hash(password, 10).then((hash) => {
        User.create({
          name,
          about,
          avatar,
          email,
          password: hash,
        })
          .then((user) => res.status(201).send({ data: user.toJSON() }))
          .catch((err) => {
            if (err.code === 11000) {
              next(
                new ConflictingRequestError(
                  "Пользователь с таким email уже есть в базе!"
                )
              );
            } else if (err.name === "ValidationError") {
              next(new BadRequestError("Введите корректные данные!"));
            } else {
              next(err);
            }
          });
      });
    },
    (error) => {
      if (error) {
        next(new BadRequestError("Введите корректные данные!"));
      } else {
      }
    }
  );
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" && JWT_SECRET ? JWT_SECRET : "dev-secret",
        { expiresIn: "7d" }
      );
      res
        .cookie("token", token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: "none",
          secure: true,
        })
        .send({ user: user.toJSON() });
    })
    .catch((err: Error) => {
      if (err.name === "ValidationError" || err.name === "Error") {
        next(new UnauthorizedError(err.message));
      } else {
        next(err);
      }
    });
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  if (req.cookies.token) {
    res.clearCookie("token").send({ message: "Выход успешно выполнен." });
  } else {
    next(new BadRequestError("Некорректный запрос"));
  }
};

export const editProfile = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user!._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((user) => res.send(user))
    .catch((err: Error) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Введите корректные данные!"));
      } else if (err.name === "CastError") {
        next(new NotFoundError("Пользователь не найден!"));
      } else {
        next(err);
      }
    });
};

export const editAvatar = (req: Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user!._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((user) => res.send(user))
    .catch((err: Error) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Введите корректные данные!"));
      } else if (err.name === "CastError") {
        next(new NotFoundError("Пользователь не найден!"));
      } else {
        next(err);
      }
    });
};
