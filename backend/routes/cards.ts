import express from "express";
import {
  validateCreateCard,
  validateCardById,
} from "../middlewares/validatons";
import {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from "../controllers/cards";

const router = express.Router();

router.get("/cards", getCards);
router.post("/cards", validateCreateCard, createCard);
router.delete("/cards/:cardId", validateCardById, deleteCard);
router.put("/cards/:cardId/likes", validateCardById, likeCard);
router.delete("/cards/:cardId/likes", validateCardById, dislikeCard);

export default router;
