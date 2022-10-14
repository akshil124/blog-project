const mongoose = require('mongoose');

const otpSchema = mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    otp : {
        type : Number,
        required : true
    },
    expiresIn : {
        type : Date,
        default : new Date().toISOString()
    }
}, {
    timestamps : true
})


const OTP = mongoose.model('OTP',otpSchema);
module.exports = OTP;
