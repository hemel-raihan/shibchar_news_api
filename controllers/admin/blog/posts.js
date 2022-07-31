
const BlogCategory = require("../../../models/admin/blog/BlogCategory");
const createError = require("../../../utils/error");
const slugify = require('slugify');
const BlogPost = require("../../../models/admin/blog/BlogPost");
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'datahostbd', 
    api_key: '121831422939177', 
    api_secret: 'C2U2pgJ8_a7mOzk6y2vyN_Fid9w',
  });

//create  
const createPost = async (req, res, next)=>{
    if(req.body.imageName == null)
    {
    
        try{
            const newPost = new BlogPost({
                title: req.body.title,
                slug: req.body.slug,
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
    else{
        const file = req.files.file;
        cloudinary.uploader.upload(file.tempFilePath, async (err, result) =>{
        
            try{
                const newPost = new BlogPost({
                    title: req.body.title,
                    slug: req.body.slug,
                    photo: result.url,
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
        })
    }
}

//all posts  
const allPosts = async (req, res, next)=>{
    try{
        //number of records want to show per page
        var perPage = 5;
        //total number of records from database
        var total = await BlogPost.count();
        //Calculating number of pagination links required
        var pages = Math.ceil(total/perPage);
        //get current page number
        var pageNumber = (req.query.page == null) ? 1 : req.query.page;
        //get records to skip
        var startFrom = (pageNumber - 1)*perPage;

        const posts = await BlogPost.find({status: true})
                           .populate('category')
                           .sort({"_id": -1})
                           .skip(startFrom)
                           .limit(perPage)
        res.status(200).json({
            "pages": pages,
            "currentPage": pageNumber,
            "perPage": perPage,
            "total": total,
            "data": posts
        });
    }
    catch(err){
        next(err)
    }
}

module.exports = {
    createPost,
    allPosts,
}