
const BlogCategory = require("../../../models/admin/blog/BlogCategory");
const createError = require("../../../utils/error");
const slugify = require('slugify');
const BlogPost = require("../../../models/admin/blog/BlogPost");

//create  
const createPost = async (req, res, next)=>{
    try{  
        const slug = slugify(req.body.title);
        const newPost = new BlogPost({
            title: req.body.title,
            slug: slug,
            photo: req.body.photo,
            desc: req.body.desc,
            category: req.body.categoryId,
        })
        
        const post = await newPost.save()

        try{
            await BlogCategory.findByIdAndUpdate(req.body.categoryId, {
                $push: {posts: post._id},
            })
        }
        catch(err){
            next(err)
        }
        
        
        res.status(200).json('Blog Post has been created');
    }
    catch(err){
        next(err)
    }
}

//all posts  
const allPosts = async (req, res, next)=>{
    try{
        const posts = await BlogPost.find({status: true}).populate('category')
        res.status(200).json(posts);
    }
    catch(err){
        next(err)
    }
}

module.exports = {
    createPost,
    allPosts
}