const express = require('express');
const router = express.Router();
const clothingController = require('../controllers/clothingController');

router.get('/', clothingController.getAllClothing);
router.get('/:id', clothingController.getClothingById);
router.post('/', clothingController.createClothing);
router.put('/:id', clothingController.updateClothing);
router.delete('/:id', clothingController.deleteClothing);
router.post('/:id/like', clothingController.likeClothing);
router.post('/:id/comment', clothingController.commentOnClothing);

module.exports = router;
