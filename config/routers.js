var Index = require('../app/controller/index');
var users = require('../app/controller/users');
var blog = require('../app/controller/blog');

module.exports = function(app) {
    // Index
    app.get('/',Index.index)

    //Blogs
    app.get('/blogs',blog.list)
    //find list by ID
    app.get('/blogs/:id',blog.detail)
    app.post('/blogs/',blog.save)
    // update by Id
    app.get('/blogs/update',blog.update)
    app.get('/blogs/new',blog.new)
    //delete by ID
    app.delete('/blogs/delete/:id',blog.delete)

    //User
    app.get('/user', users.index)
}