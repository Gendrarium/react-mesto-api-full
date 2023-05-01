import mongoose, { Model } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

export interface IUser {
  _id: mongoose.Types.ObjectId;
  email: string;
  name: string;
  about: string;
  avatar: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [
        {
          validator: (v: string) => validator.isEmail(v),
          message: "Неверный формат почты",
        },
      ],
    },
    password: {
      type: String,
      select: false,
    },
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: "Жак-Ив Кусто",
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: "Исследователь",
    },
    avatar: {
      type: String,
      default:
        "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
      validate: [
        {
          validator: (v: string) => validator.isURL(v),
          message: "Неверный формат ссылки",
        },
      ],
    },
  },
  {
    statics: {
      findUserByCredentials(email: string, password: string) {
        return this.findOne({ email })
          .select("+password")
          .then((user: any) => {
            if (!user)
              return Promise.reject(new Error("Неправильные почта или пароль"));
            return bcrypt.compare(password, user.password).then((matched) => {
              if (!matched) {
                return Promise.reject(
                  new Error("Неправильные почта или пароль")
                );
              }
              return user;
            });
          });
      },
    },
    methods: {
      toJSON() {
        const obj = this.toObject();
        delete obj.password;
        return obj;
      }
    }
  }
);

export default mongoose.model("user", userSchema);
