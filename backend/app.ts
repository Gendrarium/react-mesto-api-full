import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors, { CorsOptions } from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { errors } from "celebrate";
import {
  validateCreateUser,
  validateLoginUser,
} from "./middlewares/validatons";
import { requestLogger, errorLogger } from "./middlewares/logger";
import cards from "./routes/cards";
import users from "./routes/users";

import { login, createUser } from "./controllers/users";
import errorHandler from "./middlewares/error-handler";
import auth from "./middlewares/auth";
import NotFoundError from "./errors/not-found-error";

const app = express();
const { PORT = 5050, MONGODB_URI, FRONTEND_URI } = process.env;
const CORS_WHITELIST = [FRONTEND_URI];

mongoose.connect(MONGODB_URI!).catch((err) => {
  console.log(err);
});

const corsOption: CorsOptions = {
  credentials: true,
  origin: function checkCorsList(origin, callback) {
    if ((origin && CORS_WHITELIST.indexOf(origin) !== -1) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOption));

app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(requestLogger);

app.post("/signup", validateCreateUser, createUser);
app.post("/signin", validateLoginUser, login);
app.use(auth);

app.use(users);
app.use(cards);

app.use((req, res, next) => {
  next(new NotFoundError("Неверный адрес запроса!"));
});

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Сервер запущен", PORT);
});
