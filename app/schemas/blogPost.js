var mongoose = require('mongoose')
var moment = require('moment');
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
var BlogPostScheam = new Schema({
  title     : String,
  body      : String,
  bodyContent : String,
  author    : {type: ObjectId, ref: 'User'},
  category  : [{type: ObjectId, ref: 'Category'}],
  meta: {
    createAt: {
      type: Date,
      default: moment(Date.now()).format("YYYY-MM-DD HH:mm")
    },
    updateAt: {
      type: Date,
      default: moment(Date.now()).format("YYYY-MM-DD HH:mm")
    }
  }
})

BlogPostScheam.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = moment(Date.now()).format("YYYY-MM-DD HH:mm")
  }
  else {
    this.meta.updateAt = moment(Date.now()).format("YYYY-MM-DD HH:mm")
  }
  next()
})

BlogPostScheam.statics = {
  fetch: function(cb) {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb)
  },
  findById: function(id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb)
  }
}

module.exports = BlogPostScheam