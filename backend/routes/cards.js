const router = require('express').Router();
const { cardCreationValidation, cardIdValidation } = require('../middlewares/joiValidation');

const {
  getCards, createCard, deleteCard, setLike, removeLike,
} = require('../controllers/card');

router.get('/', getCards);
router.post('/', cardCreationValidation, createCard);
router.delete('/:cardId', cardIdValidation, deleteCard);
router.put('/:cardId/likes', cardIdValidation, setLike);
router.delete('/:cardId/likes', cardIdValidation, removeLike);

module.exports = router;
