const express = require('express');
const { create, allCategories, categoryDetails, allCategoriesWithChild } = require('../../../controllers/admin/blog/categories');

const router = express.Router();

//create
router.post('/', create)

//all categories
router.get('/', allCategories)

//all categories with child
router.get('/child', allCategoriesWithChild)

//Category Details
router.get('/:id', categoryDetails)


module.exports = router