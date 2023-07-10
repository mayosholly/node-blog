const Post = require('../models/Post')
const adminLayout = "../views/layouts/admin"

const index = async (req, res) => {
    try{
        const data = await Post.find();
        const messages =  req.flash('info');
        res.render('admin/posts/index', {layout: adminLayout, messages, data})
    }catch(error){
        console.log(error)
    }

}

const create =  async (req, res) => {
    try{
        const messages =  req.flash('info');
        res.render('admin/posts/create', {layout: adminLayout, messages})
    }catch(error){
        console.log(error)
    }

}




const store =  async (req, res) => {
    try{
        const { title, body} = req.body
        const data = await Post.find();
        const messages =  req.flash('info');
        post = await Post.create({title, body})
        await req.flash('info', 'Post Created Successfully')
        res.render('admin/posts/index', {layout: adminLayout, messages, data})
    }catch(error){
        console.log(error)
    }

}

const view = async (req, res) => {
    try{
        slug = req.params.id
        const data = await Post.findById({_id:slug})
        const messages =  req.flash('info');
        res.render('admin/posts/view', {layout: adminLayout, messages, data})
    }catch(error){
        console.log(error)
    }

}

const edit = async (req, res) => {
    try{
        const messages =  req.flash('info');
        slug = req.params.id
        const data = await Post.findById({_id:slug})
        res.render('admin/posts/edit', {layout: adminLayout, messages, data})
    }catch(error){
        console.log(error)
    }

}

const update =  async(req, res) => {
    try {
        const updatePost = {
            title : req.body.title,
            body: req.body.body,
            updatedAt: Date.now()
        }
        // console.log(req.params.id)
        await Post.findByIdAndUpdate(req.params.id, updatePost);
        await req.flash('info', 'Post  Successfully Updated')

        res.redirect(`/admin/post/${req.params.id}/edit`)

    } catch (error) {
        console.log(error);
    } 


}

const destroy =  async (req, res) => {
    try {
        await Post.deleteOne({_id: req.params.id})
        await req.flash('info', 'Post  Successfully Deleted')
        await res.redirect("/admin/post")
    }catch(error){
        console.log(error);
    }
}


module.exports = {index,  create, store, view, edit, update, destroy}