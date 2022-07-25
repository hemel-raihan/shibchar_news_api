const express = require('express');
const { createPost, allPosts } = require('../../../controllers/admin/blog/posts');

const router = express.Router();

//create
router.post('/', createPost)

//all categories
router.get('/', allPosts)


module.exports = router