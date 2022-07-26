
const BlogCategory = require("../../../models/admin/blog/BlogCategory");
const createError = require("../../../utils/error");
const slugify = require('slugify');
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'datahostbd', 
    api_key: '121831422939177', 
    api_secret: 'C2U2pgJ8_a7mOzk6y2vyN_Fid9w',
  });

//create with photo 
const createCategoryImage = async (req, res, next)=>{

    const slug = slugify(req.body.name);
    const file = req.files.file;
    cloudinary.uploader.upload(file.tempFilePath, async (err, result) =>{
        const newCategory = new BlogCategory({
            name: req.body.name,
            slug: slug,
            desc: req.body.desc,
            parentId: req.body.parentId,
            photo: result.url,
        });

        try{
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
    })
    
}

//create  withous photo
const createCategory = async (req, res, next)=>{
    try{  
        const slug = slugify(req.body.name);
        const newCategory = new BlogCategory({
            name: req.body.name,
            slug: slug,
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
        const categories = await BlogCategory.find({status: true})
        res.status(200).json(categories);
    }
    catch(err){
        next(err)
    }
}

//all categories with child  
const allCategoriesWithChild = async (req, res, next)=>{
    try{
        // const populateObj = {
        //     path: "childs",

        //     populate: {
        //         path: "childs",
        //         populate:{
        //             path: "childs",
        //             populate:{
        //                 path: "childs"
        //             }
        //         }
        //     },
        //    };
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
        const room = await BlogCategory.findById(req.params.id)
        res.status(200).json(room);
    }
    catch(err){
        next(err)
    }
}

module.exports = {
    createCategoryImage,
    createCategory,
    allCategories,
    allCategoriesWithChild,
    categoryDetails
}