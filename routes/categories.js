const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoriesController');

router.get('/', categoryController.getAllCategories);
router.get('/create', categoryController.getCreateForm);
router.post('/create', categoryController.createCategory);
router.get('/:id', categoryController.getCategoryById);
router.get('/:id/edit', categoryController.getEditForm);
router.post('/:id/edit', categoryController.updateCategory);
router.post('/:id/delete', categoryController.deleteCategory);

module.exports = router;