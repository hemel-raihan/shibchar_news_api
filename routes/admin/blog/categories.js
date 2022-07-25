const express = require('express');
const { create, allCategories, categoryDetails } = require('../../../controllers/admin/blog/categories');

const router = express.Router();

//create
router.post('/', create)

//all categories
router.get('/', allCategories)

//Category Details
router.get('/:id', categoryDetails)


module.exports = router