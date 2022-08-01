const express = require('express');
const { allCategoriesWithChild, allCategoriesPosts, postDetails, categoryDetails, AllPostByCategory } = require('../../controllers/frontend/home');
const router = express.Router();


//all categories with child
router.get('/categories', allCategoriesWithChild)

//all categories with posts
router.get('/categories/posts', allCategoriesPosts)

//category details
router.get('/category/:id', categoryDetails)

//post details
router.get('/post/:slug', postDetails)

//all posts by category
router.get('/category/posts/:slug', AllPostByCategory)


module.exports = router