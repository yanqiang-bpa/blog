var index = require('../app/controller/index');
var users = require('../app/controller/users');
var blog = require('../app/controller/blog');

module.exports = function(app) {
    // Index
    app.get('/',index.index)

    //Blogs
    app.get('/blogs',blog.list)
    //find list by ID
    app.get('/blogs/list/:id',blog.detail)
    //save a blog
    app.post('/blogs/admin/save',blog.save)
    // update by Id
    app.get('/blogs/update/:id',blog.update)
    // forward a new blog page
    app.get('/blogs/admin/new',blog.new)
    //delete by ID
    app.delete('/blogs/delete/:id',blog.delete)

    //User
    app.get('/user', users.index)
}