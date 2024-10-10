const express = require('express');
const router = express.Router();
const accessoriesController = require('../controllers/accessoriesController');

router.get('/', accessoriesController.getAllAccessories);
router.get('/:id', accessoriesController.getAccessoryById);
router.post('/', accessoriesController.createAccessory);
router.put('/:id', accessoriesController.updateAccessory);
router.delete('/:id', accessoriesController.deleteAccessory);
router.post('/:id/like', accessoriesController.likeAccessory);
router.post('/:id/comment', accessoriesController.commentOnAccessory);

module.exports = router;
