const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    blogheading : {
        type : String,
    },
    blogsubheading : {
        type : String,
    },
    blogDate : {
        type : String,
    },
    blogContent : {
        type : String,
    },
    blogimage : {
        type : String,
    },
    userid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
    comments : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'comments',
        default : []
    }],
    // image : {
    //     type : String,
    // },
});

const Blogs = mongoose.model('Blogs',blogSchema);
module.exports = Blogs;