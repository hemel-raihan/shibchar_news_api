
const BlogCategory = require("../../../models/admin/blog/BlogCategory");
const createError = require("../../../utils/error");
const slugify = require('slugify');

//create  
const create = async (req, res, next)=>{
    try{  
        const slug = slugify(req.body.name);
        const newCategory = new BlogCategory({
            name: req.body.name,
            slug: slug,
            photo: req.body.photo,
            desc: req.body.desc,
            parentId: req.body.parentId,
        })
        
        await newCategory.save()

        if(req.body.parentId != null){
            try{
                await BlogCategory.findByIdAndUpdate(req.body.parentId, {
                    $push: {childs: newCategory._id},
                })
            }
            catch(err){
                next(err)
            }
        }
        
        res.status(200).json('Blog Category has been created');
    }
    catch(err){
        next(err)
    }
}

//all categories  
const allCategories = async (req, res, next)=>{
    try{
        const categories = await BlogCategory.find().populate({
            path: 'childs',
            populate: {
                path: 'childs',
                populate:{
                    path: 'childs',
                }
                // model: 'Playlist',
                // populate: {
                //     path: 'videos',
                //     model: 'Video'
                // }
            } 
        })
        res.status(200).json(categories);
    }
    catch(err){
        next(err)
    }
}

module.exports = {
    create,
    allCategories
}