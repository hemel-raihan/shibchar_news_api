const express = require('express');
const { allCategoriesWithChild, allCategoriesPosts, postDetails } = require('../../controllers/frontend/home');
const router = express.Router();


//all categories with child
router.get('/categories', allCategoriesWithChild)

//all categories with posts
router.get('/categories/posts', allCategoriesPosts)

//post details
router.get('/post/:id', postDetails)


module.exports = router