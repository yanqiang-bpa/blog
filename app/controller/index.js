var mongoose = require('mongoose')
var Category = require('../models/category')
var BlogPost = require('../models/blogPost')
var User = require('../models/user')
/* GET home page. */
exports.index = function(req, res) {
    //show all Category
    //show all BlogPost
    BlogPost.find({})
      .populate('author', 'name')
      .populate('category','name')
      .exec(function(err, blogPosts) {
          if(err) {
              console.log(err)
          }
          console.log(blogPosts)
          res.render('index',{
              title: 'Jason Blog',
              blogPosts: blogPosts
          })
      })
}
