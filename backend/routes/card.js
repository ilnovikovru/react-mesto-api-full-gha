const express = require('express');
const {
  createCard, getCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/card');
const { validateObjId, validateCard } = require('../validators');

const router = express.Router();

router.get('/api/cards', getCards);
router.post('/api/cards', validateCard, createCard);
router.delete('/api/cards/:id', validateObjId, deleteCard);
router.put('/api/cards/:id/likes', validateObjId, likeCard);
router.delete('/api/cards/:id/likes', validateObjId, dislikeCard);

module.exports = router;
