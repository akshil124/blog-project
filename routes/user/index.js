const express = require('express');
const routes = express.Router();
const usercontroller = require('../../controller/usercontroller')
const passport = require('passport');
const passportlocal = require('../../controller/passport-local')

routes.post('/register',usercontroller.createuser)
routes.post('/login', passport.authenticate('local',{ failureRedirect: '/user/login' }) , usercontroller.loginuser)
routes.get('/googleLogin',passport.authenticate('google', { scope: ['profile','email'] }),usercontroller.createSession)
routes.get('/profile',usercontroller.profile)
routes.get('/forgetpassword',usercontroller.forgetpassword)
routes.post('/sentotp',usercontroller.sentotp);
routes.post('/verifyotp',usercontroller.verifyotp);
routes.post('/updatepassword',usercontroller.updatepassword);


routes.get('/logout',usercontroller.logoutuser)
module.exports = routes;
