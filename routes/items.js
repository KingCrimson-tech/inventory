const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');

router.get('/', itemsController.getAllItems);
router.get('/create', itemsController.getCreateForm);
router.post('/create', itemsController.createItem);
router.get('/:id', itemsController.getItemById);
router.get('/:id/edit', itemsController.getEditForm);
router.post('/:id/edit', itemsController.updateItem);
router.post('/:id/delete', itemsController.deleteItem);

module.exports = router;