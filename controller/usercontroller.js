const User = require('../models/user');
const flash = require('connect-flash');
const bcrypt = require('bcrypt');
const {sendOTPEmail} = require('../nodemailer/sentotp');
const OTP = require('../models/otp');

module.exports.dashboard = (req,res) => {
    return res.render('dashboard.ejs')
}
module.exports.homepage = (req,res) => {
    return res.render('home.ejs')
}
module.exports.createSession = (req,res) => {
    req.flash('success', 'logged in successfully')
    return res.redirect('/')
}

module.exports.loginuser = async (req,res) => {
    req.flash('success', 'logged in successfully');
    return res.redirect('/');
}

module.exports.register = (req,res) => {
    return res.render('user/register.ejs')
}

module.exports.loginpage = (req,res) => {
    return res.render('user/login.ejs')
}

module.exports.profile = (req,res) => {
    return res.render('user/updateprofile.ejs',{
        id : req.user._id,
        firstName : req.user.firstName,
        lastName :  req.user.lastName,
        password :  req.user.password,
        email : req.user.email
    })
}

module.exports.forgetpassword = (req,res) => {
    res.render('user/forgetpassword',{
        auth : false
    });
}

module.exports.sentotp = async (req,res) => {
    const otp = Math.floor(100000 + Math.random() * 500000);
    console.log(otp);
    await sendOTPEmail(req.body.email,otp)
    await OTP.create({
        otp,
        email : req.body.email,
        expiresIn : new Date(new Date().getTime() + 5 * 50000)
    })

    req.flash('success','OTP Send successfully');
    return res.cookie('email',req.body.email).redirect('/user/forgetpassword')

}

module.exports.verifyotp = async (req,res) => {
    console.log(req.body.otp);
    const userotp =  await OTP.findOne({ otp : req.body.otp , email : req.cookies.email }).sort({ createdAt : -1  })
    console.log('userotp++',userotp);
    if(!userotp) {
        req.flash('error','OTP Not Found')
        return res.redirect('/user/forgetpassword')
    }
    
    if(new Date().getTime() > new Date(userotp?.expiresIn).getTime()) {
        req.flash('error','Your OTP Is Expired')
        return res.redirect('/user/forgetpassword')
    }
    
    const user = await User.findOne({ email : userotp?.email  }).sort({ createdAt : -1  })

    req.flash('success','OTP verified successfully')
    return res.render('user/updatepassword.ejs', {
        auth : true,
        user : user._id
    })
}

module.exports.updatepassword = async (req,res) => {
    const password = await bcrypt.hash(req.body.password,10);
    req.body.password = password
    await User.findByIdAndUpdate(req.body.id,req.body)
    req.flash('success','password Update Successfully');
    return res.redirect('/');
}

module.exports.createuser = async (req,res) => {
    const Existinguser = await User.findOne({ email : req.body.email});
    
    if(Existinguser){
        req.flash('error','User Already Exist');
        return res.redirect('/user/register');
    }
    const password = await bcrypt.hash(req.body.password,10);
    req.body.password = password;
    const data = await User.create(req.body);
    req.flash('success','User Registered');
    return res.redirect('/user/login')
}


module.exports.login = (req,res) => {
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    return res.render('user/login.ejs')
}

module.exports.logoutuser = async (req,res) => {
        req.logout((err) => {
        if (err) { return next(err); }
        req.flash('success','Logout Successfully');
        return res.clearCookie('user').redirect('/dashboard');
    });
}