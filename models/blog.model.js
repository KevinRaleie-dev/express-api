const mongoose = require('mongoose');
const Schema = mongoose.Schema

const BlogPostSchema = new Schema({
    blogTitle:{
        type: String,
        unique: true,
        required: true,
            trim: true,
    },
    blogImage:{
        type: String,
        required: true
    },
    blogContent:{
        type: String,
        required: true,
            trim: true,
    },
},{
    timestamps: true,
} )

module.exports = mongoose.model('BlogPost', BlogPostSchema)