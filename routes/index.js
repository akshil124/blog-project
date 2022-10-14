const express = require('express');
const routes = express.Router();
const user = require('./user');
const usercontroller = require('../controller/usercontroller')
const passport = require('passport');
const passportlocal = require('../controller/passport-local')
const passportgoogle = require('../controller/passport-google')
const blogcontroller = require('../controller/blogcontroller');
const commentcontroller = require('../controller/commentcontroller')

routes.use('/user',user);
routes.get('/',passport.checkAuthentication,usercontroller.homepage)
routes.get('/dashboard',blogcontroller.getblog)
routes.get('/user/register',usercontroller.register)
routes.get('/user/login',usercontroller.loginpage)
routes.get('/auth/google/callback',passport.authenticate('google', { failureRedirect: '/user/login' }),usercontroller.createSession)
routes.get('/blog',passport.checkAuthentication,blogcontroller.blogpage)
routes.post('/createblog',blogcontroller.createblog);
routes.post('/addcomment',commentcontroller.createcomment);
routes.get('/deleteblog/:id',blogcontroller.deleteblog)
routes.get('/deletecomment/:id',commentcontroller.deletecomment)
// routes.get('/',blogcontroller.getblog)

module.exports = routes;