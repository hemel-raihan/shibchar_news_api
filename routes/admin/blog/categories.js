const express = require('express');
const { allCategories, categoryDetails, allCategoriesWithChild, createCategoryImage, createCategory, deleteCategory, updateCategoryImage, updateCategory } = require('../../../controllers/admin/blog/categories');
const checkLogin = require('../../../middleware/checkLogin');

const router = express.Router();

//create with photo
router.post('/create', checkLogin, createCategoryImage)

//create without photo
router.post('/', createCategory)

//Category edit with photo
router.put('/update/:id/:parentId', updateCategoryImage)

//Category edit without photo
router.put('/:id', updateCategory)

//all categories
router.get('/', checkLogin, allCategories)

//all categories with child
router.get('/child', checkLogin, allCategoriesWithChild)

//Category Details
router.get('/:id', categoryDetails)

//Category Delete
router.delete('/:id/:parentId', deleteCategory)


module.exports = router