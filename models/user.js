const mongoose = require('mongoose');

const userschema = mongoose.Schema({
    firstname : {
        type : String,
    },
    lastname : {
        type : String,
    },
    email : {
        type : String,
        unique : true,
    },
    password : {
        type : String,
    },
});

const User = mongoose.model('User',userschema);
module.exports = User;