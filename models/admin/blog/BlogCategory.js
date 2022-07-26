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
        type: String,
        default: "default.png"
      },
      desc: {
        type: String,
      },
      parentId: {
        type: mongoose.Types.ObjectId,
        default: null,
        required: false,
      },
      status: {
        type: Boolean,
        default: true,
      },
      childs: {
          type: [mongoose.Types.ObjectId],
          ref: "BlogCategory"
      },
      posts: [
        {
            type: mongoose.Types.ObjectId,
            ref: "BlogPost"
        }
      ]
    },
    { timestamps: true }
);

module.exports = mongoose.model('BlogCategory', BlogCategorySchema);