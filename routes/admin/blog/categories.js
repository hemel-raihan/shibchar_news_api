const express = require('express');
const { allCategories, categoryDetails, allCategoriesWithChild, createCategoryImage, createCategory, deleteCategory, updateCategoryImage, updateCategory } = require('../../../controllers/admin/blog/categories');

const router = express.Router();

//create with photo
router.post('/create', createCategoryImage)

//create without photo
router.post('/', createCategory)

//Category edit with photo
router.put('/update/:id', updateCategoryImage)

//Category edit without photo
router.put('/:id', updateCategory)

//all categories
router.get('/', allCategories)

//all categories with child
router.get('/child', allCategoriesWithChild)

//Category Details
router.get('/:id', categoryDetails)

//Category Delete
router.delete('/:id/:parentId', deleteCategory)


module.exports = router