
const BlogCategory = require("../../models/admin/blog/BlogCategory");
const BlogPost = require("../../models/admin/blog/BlogPost");
const createError = require("../../utils/error");
const slugify = require('slugify');


//all categories with child  
const allCategoriesWithChild = async (req, res, next)=>{
    try{
        const categories = await BlogCategory.find({parentId: null}).populate({
            path: 'childs',
            populate: {
                path: 'childs',
                populate:{
                    path: 'childs',
                    populate:{
                        path: 'childs',
                    }
                }
            }
        }).populate('posts')
        res.status(200).json(categories);
    }
    catch(err){
        next(err)
    }
}

//details
const categoryDetails = async (req, res, next)=>{
    try{
        const category = await BlogCategory.findById(req.params.id).populate('posts')
        res.status(200).json(category);
    }
    catch(err){
        next(err)
    }
}

//all posts  
const allCategoriesPosts = async (req, res, next)=>{
    try{
        const categoriesPosts = await BlogCategory.find({status: true})
                           .populate('posts')
                           .limit(10)
        res.status(200).json({
            "data": categoriesPosts
        });
    }
    catch(err){
        next(err)
    }
}

//post details
const postDetails = async (req, res, next)=>{
    try{
        const post = await BlogPost.find({slug: req.params.slug}).populate({
            path: 'category',
            populate: {
                path: 'posts',
                populate:{
                    path: 'category',
                }
            }
        })
        res.status(200).json(post);
    }
    catch(err){
        next(err)
    }
}

module.exports = {
    allCategoriesWithChild,
    categoryDetails,
    allCategoriesPosts,
    postDetails,
}