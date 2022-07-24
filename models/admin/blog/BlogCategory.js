const mongoose = require('mongoose')

const BlogCategorySchema = new mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
      slug: {
        type: String,
        required: true,
      },
      photo: {
        type: [String],
      },
      desc: {
        type: String,
      },
      parentId: {
        type: mongoose.Types.ObjectId,
        default: null,
      },
      status: {
        type: Boolean,
        default: true,
      },
      childs: [
        {
          type: [String],
          ref: "BlogCategory"
        }
      ] 
      
    },
    { timestamps: true }
);

module.exports = mongoose.model('BlogCategory', BlogCategorySchema);