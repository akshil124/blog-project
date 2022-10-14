const Blogs = require('../models/blog');
const comments = require('../models/comment');

module.exports.createcomment = async (req,res) => {
    const Blog = await Blogs.findById(req.body.blogid);
    
    if(!Blog){
        req.flash("error","Blog Not Found");
        return res.redirect('/dashbord');
    }

    const comment = await comments.create({
        content : req.body.content,
        blogid : req.body.blogid,
        userid : req?.user?._id
    });

    Blog.comments.push(comment._id)
    await Blog.save()

    req.flash('success','Comment Added successfully')
    return res.redirect('/dashboard')
}

module.exports.deletecomment = async (req,res) => {
    const comment  = await comments.findById(req.params.id)
    console.log("comment++",comment);
    if(!comment){
        req.flash('error','Comment Not Found');
        return res.redirect('/dashboard');
    }

    if(comment.userid.toString() == req.user._id.toString()){
        await comment.remove();
        console.log("comment removed");
        await Blogs.findByIdAndUpdate(comment.blogid,{
            $pull : {
                comment : req.params.id,
            }
        })
    }

    req.flash('success','Comment Deleted');
    return res.redirect('/dashboard');
}