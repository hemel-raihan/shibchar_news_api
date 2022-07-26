const express = require('express');
const { allCategories, categoryDetails, allCategoriesWithChild, createCategoryImage, createCategory } = require('../../../controllers/admin/blog/categories');

const router = express.Router();

//create with photo
router.post('/create', createCategoryImage)

//create without photo
router.post('/', createCategory)

//all categories
router.get('/', allCategories)

//all categories with child
router.get('/child', allCategoriesWithChild)

//Category Details
router.get('/:id', categoryDetails)


module.exports = router