const Blogs = require('../models/blog')
// const multer = require('multer');
const flash = require('connect-flash')
const comments = require('../models/comment')


module.exports.blogpage = (req,res) => {
    return res.render('blog/blog.ejs')
}

// const storage = multer.diskStorage({
//     destination : function(req,file,callback){
//         callback(null,'../public/images');
//     },
//     filename : function(req,file,callback){
//         callback(null,file.originalname);
//     }
// })

// const Imageupload = multer({storage : storage}).single('image');

module.exports.createblog = async (req,res) => {
    console.log(req?.user?._id);
    await Blogs.create({
        blogheading : req.body.blogheading,
        blogsubheading : req.body.blogsubheading,
        blogDate : req.body.blogDate,
        blogContent : req.body.blogContent,
        blogimage : req.body.blogimage,
        userid : req?.user?._id,
    });
    req.flash('success','Blog Added Successfully')
    return res.redirect('/');
}

module.exports.getblog = async (req,res) => {
    const data = await Blogs.find({}).populate('userid').populate({
        path : 'comments',
        populate : {
            path : 'userid'
        }
    })
    

    return res.render('dashboard.ejs',{
        data,
        userid : req?.user?._id,
        auth : req?.user ? true : false
    })
}

module.exports.deleteblog = async (req,res) => {
    const blogdata = await Blogs.findById(req.params.id)
    
    if(!blogdata){
        req.flash('error','Blog Not Found');
        return res.redirect('/dashboard')
    }
    
    if(blogdata.userid.toString() === req.user._id.toString()){
        await blogdata.remove();
        await comments.remove({ blogid : req.params.id })
        req.flash("success","Blog Deleted");
        return res.redirect('/dashboard')
    }
}