import type { Request, Response, NextFunction } from "express";
import UnauthorizedError from "../errors/unauthorized-error";
import BadRequestError from "errors/bad-request-error";
import ConflictingRequestError from "errors/conflicting-request-error";
import ForbiddenError from "errors/forbidden-error";
import NotFoundError from "errors/not-found-error";

const errorHandler = (
  err:
    | UnauthorizedError
    | BadRequestError
    | ConflictingRequestError
    | ForbiddenError
    | NotFoundError
    | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //@ts-ignore
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });

  next();
};

export default errorHandler;
