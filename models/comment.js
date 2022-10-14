const mongoose = require('mongoose');

const commentschema = mongoose.Schema({
    content : {
        type : String,
    },
    userid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    blogid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Blogs'
    }
});

const comments = mongoose.model('comments',commentschema);
module.exports = comments;