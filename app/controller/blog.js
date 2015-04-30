var mongoose = require('mongoose')
var Category = require('../models/category')
var BlogPost = require('../models/blogPost')
var User = require('../models/user')

/* get ALL BlogPosts */
exports.list = function(req, res){
    BlogPost.find({})
        .populate('author', 'name')
        .populate('category','name')
        .exec(function(err, blogPosts) {
            if(err) {
               console.log(err)
            }
            console.log(blogPosts)
            res.render('list',{
                title: 'Blog Index',
                blogPosts: blogPosts
            })
        })
}

/**
 * find listAll by Id
 * */
exports.detail = function(req, res) {
    var id = req.params.id
    console.log(id)
    if (id) {
        BlogPost.findOne({_id : id})
            .populate('author', 'name') // join User
            .populate('category','name') // // join Category
            .exec(function (err, blogPost) {
                if(err) {
                    console.log(err)
                }
                console.log(blogPost)
                res.render('detail',
                    {
                        title: 'detail',
                        blogPost : blogPost
                    });
            })
    } else {
        res.send(id)
    }
}

/**
 * add a new or update blogPost
 */
exports.save = function(req, res) {
    console.log(req.body)
    var id = req.body._id
    var blogPostObj = req.body

    if (id) {
        BlogPost.findById(id, function(err, blogPost){
            if(err) {
                console.log(err)
            }
            blogPost.title = blogPostObj.title
            blogPost.body = blogPostObj.body
            blogPost.author = blogPostObj.author
            blogPost.category = blogPostObj.category
            blogPost.save()

            // redirect to /Blog/list/id
            res.redirect('/blogs')
        })
    } else {
        var blogPostModel = new BlogPost(blogPostObj)
        blogPostModel.save(function(error){
            if(error){
                console.log(error);
                return res.json({msg: "error"})
            }
            console.log("user created: " + blogPostModel);
            // redirect to /Blog/list/id
            res.redirect('/blogs')
        })
    }
}

/**
 * update a blog
 */
exports.update =  function(req, res) {
    var id = req.params.id
    if(id) {
        BlogPost.findById(id, function(err, blogPost){
            if(err) {
                console.log(err)
            }
            console.log(blogPost)
            Category.find({}, function(err, categories) {
                res.render('admin',
                    {
                        blogPost: blogPost,
                        categorys:categories
                    })
            })
        })
    } else {
        res.send(id)
    }
}

/***
**GET admin page.
*/
exports.new = function(req, res, next) {
    Category.find({}, function (err, categorys) {
        console.log(categorys)
        res.render('admin',
            {
                blogPost:{},
                categorys:categorys
            });
    })
}


/**
 * Delete a blogPost
 */
exports.delete = function(req, res) {
    var id = req.params.id
    console.log(id)
    //res.json({success: 1})
    if( id ) {
        BlogPost.remove({ _id : id },function(err, blogPost) {
            if(err) {
                console.log(err)
                res.json({success: 0})
            } else {
                res.json({success: 1})
            }
        })
    }
}



