import { celebrate, Joi } from "celebrate";
import { Types } from "mongoose";
import validator from "validator";

const { ObjectId } = Types;

export const validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helpers.message({ message: "Невалидный email" });
      }),
    password: Joi.string().min(8).required().messages({
      "string.min": 'Минимальная длина поля "password" - 8',
      "any.required": 'Поле "password" должно быть заполнено',
    }),
    name: Joi.string().min(2).max(30).messages({
      "string.min": 'Минимальная длина поля "name" - 2',
      "string.max": 'Максимальная длина поля "name" - 30',
    }),
    about: Joi.string().min(2).max(30).messages({
      "string.min": 'Минимальная длина поля "about" - 2',
      "string.max": 'Максимальная длина поля "about" - 30',
    }),
    avatar: Joi.string().custom((value, helpers) => {
      if (validator.isURL(value, { require_protocol: true })) {
        return value;
      }
      return helpers.message({ message: "Невалидная ссылка" });
    }),
  }),
});

export const validateLoginUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helpers.message({ message: "Невалидный email" });
      }),
    password: Joi.string().min(8).required().messages({
      "string.min": 'Минимальная длина поля "password" - 8',
      "any.required": 'Поле "password" должно быть заполнено',
    }),
  }),
});

export const validateGetUserById = celebrate({
  params: Joi.object().keys({
    userId: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (ObjectId.isValid(value)) {
          return value;
        }
        return helpers.message({ message: "Невалидный id" });
      }),
  }),
});

export const validateEditProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required().messages({
      "string.min": 'Минимальная длина поля "name" - 2',
      "string.max": 'Максимальная длина поля "name" - 30',
      "any.required": 'Поле "name" должно быть заполнено',
    }),
    about: Joi.string().min(2).max(30).required().messages({
      "string.min": 'Минимальная длина поля "about" - 2',
      "string.max": 'Максимальная длина поля "about" - 30',
      "any.required": 'Поле "about" должно быть заполнено',
    }),
  }),
});

export const validateEditAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (validator.isURL(value, { require_protocol: true })) {
          return value;
        }
        return helpers.message({ message: "Невалидная ссылка" });
      }),
  }),
});

export const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required().messages({
      "string.min": 'Минимальная длина поля "name" - 2',
      "string.max": 'Максимальная длина поля "name" - 30',
      "any.required": 'Поле "name" должно быть заполнено',
    }),
    link: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (validator.isURL(value, { require_protocol: true })) {
          return value;
        }
        return helpers.message({ message: "Невалидная ссылка" });
      }),
  }),
});

export const validateCardById = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (ObjectId.isValid(value)) {
          return value;
        }
        return helpers.message({ message: "Невалидный id" });
      }),
  }),
});
