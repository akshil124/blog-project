const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy({
    usernameField : 'email'
    },
    function(email,password,done){
        User.findOne({email}, async (error,user) => {
            // console.info("user++ ",user)
            if(error){
                done(error)
            }
            if(!user){
                done(null,false)
            }

            // console.info("passport.checkAuthentication+ ",password , user.password)
            const data = await bcrypt.compare(password, user.password)
            if(!data){
                done(null,false)
            }
            return done(null,user)
        })
    }
))

passport.serializeUser(function(user,done){
    done(null,user.id)
})

passport.deserializeUser(function(id,done){
    User.findById(id,(error,user) => {
        if(error){
            done(error)
        }
        return done(null,user)
    })
})

passport.checkAuthentication = (req,res,next) => {
    if(req.isAuthenticated()){
        next()
    }
    else {
       return res.redirect('/user/login');
    }
}

passport.setAuthenticatedUser = (req,res,next) => {
    if(req.isAuthenticated()){
        res.locals.user = req.user
    }
    next()
}