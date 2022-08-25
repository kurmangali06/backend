import {body} from "express-validator"


export const loginValidator = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен быть минимум 5 символов").isLength({
    min: 5
  })
]


export const registerValidator = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен быть минимум 5 символов").isLength({
    min: 5
  }),
  body("fullName", "Укажите имя").isLength({
    min:3
  }),
  body("avatarUrl", "Неверный ссылку на аватарку").optional().isURL(),
]


export const postCreateValidator = [
  body("title", "Введите заголовок").isLength({min:3}).isString(),
  body("text", "Введите текст статьй").isLength({
    min: 10
  }).isString(),
  body("imageUrl", "Неверная ссылка на изображение").optional().isString(),
]