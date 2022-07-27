
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

//create  without photo
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

//update with photo
const updateCategoryImage = async (req, res, next)=>{
    const parentId = req.params.parentId;
    const slug = slugify(req.body.name);
    if(req.body.imageName == null)
    {
        const body = {
            name: req.body.name,
            slug: slug,
            desc: req.body.desc,
            parentId: req.body.parentId
        }
    
        try{
            const updatedCategory = await BlogCategory.findByIdAndUpdate(req.params.id, {$set: body}, {new:true})
    
            if(req.body.parentId != null){
                try{
                    await BlogCategory.findByIdAndUpdate(parentId, {
                        $pull: {childs: req.params.id},
                    })
                    await BlogCategory.findByIdAndUpdate(req.body.parentId, {
                        $push: {childs: updatedCategory._id},
                    })
                }
                catch(err){
                    next(err)
                }
            }
            
            res.status(200).json('Blog Category has been Updated');
        }
        catch(err){
            next(err)
        }
    }
    else{
        const file = req.files.file;
        cloudinary.uploader.upload(file.tempFilePath, async (err, result) =>{
            const body = {
                name: req.body.name,
                slug: slug,
                desc: req.body.desc,
                parentId: req.body.parentId,
                photo: result.url,
            }
            try{
                const updatedCategory = await BlogCategory.findByIdAndUpdate(req.params.id, {$set: body}, {new:true})

                if(req.body.parentId != null){
                    try{
                        await BlogCategory.findByIdAndUpdate(req.body.parentId, {
                            $push: {childs: updatedCategory._id},
                        })
                    }
                    catch(err){
                        next(err)
                    }
                }
                
                res.status(200).json('Blog Category has been Updated');
            }
            catch(err){
                next(err)
            }
        })
    }
    
}

//update without photo
const updateCategory = async (req, res, next)=>{
    const slug = slugify(req.body.name);
    const body = {
        name: req.body.name,
        slug: slug,
        desc: req.body.desc,
        parentId: req.body.parentId
    }

    try{
        const updatedCategory = await BlogCategory.findByIdAndUpdate(req.params.id, {$set: body}, {new:true})

        if(req.body.parentId != null){
            try{
                await BlogCategory.findByIdAndUpdate(req.body.parentId, {
                    $push: {childs: updatedCategory._id},
                })
            }
            catch(err){
                next(err)
            }
        }
        
        res.status(200).json('Blog Category has been Updated');
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
        const category = await BlogCategory.findById(req.params.id)
        res.status(200).json(category);
    }
    catch(err){
        next(err)
    }
}

//delete  
const deleteCategory = async (req, res, next)=>{
    const parentId = req.params.parentId;
    try{
        const category = await BlogCategory.findById(req.params.id)
        if(category.childs.length != 0 ){
            return next(createError(501, 'Can not delete this item. This category has childs item'))
        }
        else{
            await BlogCategory.findByIdAndDelete(req.params.id)
            try{
                await BlogCategory.findByIdAndUpdate(parentId, {
                    $pull: {childs: req.params.id},
                })
            }
            catch(err){
                next(err)
            }
            res.status(200).json('Category has been deleted');
        }
        
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
    categoryDetails,
    deleteCategory,
    updateCategoryImage,
    updateCategory
}