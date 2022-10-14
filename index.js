require('dotenv').config()
const express = require('express')
const app = express();
const bodyparser = require('body-parser');
const db = require('./config/db');
// const multer = require('multer');
const routes = require('./routes');
const flash = require('connect-flash');
const session = require('express-session');
const cookie = require('cookie-parser')
const flashHandler = require('./middleware/flashHandle');
const passport = require('passport');
const passportlocal = require('./controller/passport-local');
const googleStrategy = require('./controller/passport-google');
// const userauthenticate = require('./middleware/userlogin');
app.use(bodyparser());
app.set('view engine', 'ejs');
app.use(express.static('public'));
db.mongoose.connect(db.url).then(() => {
    console.log("mongodb connected");
}).catch((error) => {
    console.log("mongodb err ++",error);
})
app.use(cookie());
app.use((req, res, next) => {
    res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
    })
    next()
})

app.use(session({
    secret: 'Blog',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge : 1000000 }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(flashHandler.flashHandle);
app.use(routes);

// app.get('/blog',(req,res) =>{
//    return res.render('blog.ejs',{
//     })
// });
// module.exports = Imageupload;

app.listen(process.env.PORT,() => {
    console.info('server connected')
})