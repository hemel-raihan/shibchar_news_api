const mongoose = require('mongoose')

const BlogPostSchema = new mongoose.Schema({
      title: {
        type: String,
        required: true,
      },
      slug: {
        type: String,
        required: true,
      },
      photo: {
        type: String,
      },
      desc: {
        type: String,
      },
      status: {
        type: Boolean,
        default: true,
      },
      category: {
          type: mongoose.Types.ObjectId,
          ref: "BlogCategory",
          required: true
      },
    },
    { timestamps: true }
);

module.exports = mongoose.model('BlogPost', BlogPostSchema);