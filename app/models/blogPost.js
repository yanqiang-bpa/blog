var mongoose = require('mongoose')
var BlogPostSchema = require('../schemas/blogPost')
var BlogPost = mongoose.model('BlogPost', BlogPostSchema)

module.exports = BlogPost