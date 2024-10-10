const express = require('express');
const router = express.Router();
const shoeController = require('../controllers/shoeController');

router.get('/', shoeController.getAllShoes);
router.get('/:id', shoeController.getShoeById);
router.post('/', shoeController.createShoe);
router.put('/:id', shoeController.updateShoe);
router.delete('/:id', shoeController.deleteShoe);
router.post('/:id/like', shoeController.likeShoe); // Like route
router.post('/:id/comment', shoeController.commentOnShoe); // Comment route

module.exports = router;
