import jwt from "jsonwebtoken";
import UnauthorizedError from "../errors/unauthorized-error";

import type { Request, Response, NextFunction } from "express";

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;

  if (!token) {
    next(new UnauthorizedError("Необходима авторизация"));
  } else {
    let payload: any;

    try {
      payload = jwt.verify(
        token,
        NODE_ENV === "production" && JWT_SECRET ? JWT_SECRET : "dev-secret"
      );
    } catch (err) {
      next(new UnauthorizedError("Необходима авторизация"));
    }

    req.user = payload;

    next();
  }
};

export default auth;
