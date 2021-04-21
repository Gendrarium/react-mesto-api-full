const router = require('express').Router();
const { validateCreateCard, validateCardById } = require('../middlewares/validatons');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', validateCreateCard, createCard);
router.delete('/cards/:cardId', validateCardById, deleteCard);
router.put('/cards/:cardId/likes', validateCardById, likeCard);
router.delete('/cards/:cardId/likes', validateCardById, dislikeCard);

module.exports = router;
