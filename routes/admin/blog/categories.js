const express = require('express');
const { create, allCategories } = require('../../../controllers/admin/blog/categories');

const router = express.Router();

//create
router.post('/', create)

//all categories
router.get('/', allCategories)


module.exports = router