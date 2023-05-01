import express from "express";
const router = express.Router();

import {
  validateGetUserById,
  validateEditProfile,
  validateEditAvatar,
} from "../middlewares/validatons";
import {
  getUsers,
  getUserById,
  getUserMe,
  editProfile,
  editAvatar,
  logout,
} from "../controllers/users";

router.get("/logout", logout);
router.get("/users", getUsers);
router.get("/users/me", getUserMe);
router.get("/users/:userId", validateGetUserById, getUserById);
router.patch("/users/me", validateEditProfile, editProfile);
router.patch("/users/me/avatar", validateEditAvatar, editAvatar);

export default router;
