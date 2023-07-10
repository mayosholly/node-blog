const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

router.get('', async (req, res) => {
    const locals = {
        title : "Node js Blog",
        description : "Simple Blog created with Nodejs, Express and MongoDb"
        }
    try {
    
        const data = await Post.find();
        res.render("index", {locals, data})
    } catch (error) {
        console.log(error);
    }

})

router.get('/post/:id', async(req, res) => {
   
    try {

        slug = req.params.id
        const post = await Post.findById({_id:slug})
        const locals = {
            title : post.title,
            description : post.body
            }
        res.render('show', {
            locals, post
        })
        
    } catch (error) {
        
    }
})

router.post('/search', async(req, res) => {
   
    try {
        const locals = {
            title : "Node js Blog",
            description : "Simple Blog created with Nodejs, Express and MongoDb"
        }
        searchTerm = req.body.search
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "")
        const data = await Post.find({
            $or: [
                {title: {$regex: new RegExp(searchNoSpecialChar, 'i') }},
                {body: {$regex: new RegExp(searchNoSpecialChar, 'i') }}
            ]
        })   
        res.render("search",  { data, locals})     
    } catch (error) {
        
    }
})

// function insertPostData(){
//     Post.insertMany([
//         {
//         title: "Building a Blog",
//         body: "Ilorem Hopsom ahell asll",
//     },
//     {
//         title: "Building a Blog1",
//         body: "Ilorem Hopsom ahell asll1",
//     },
//     {
//         title: "Building a Blog2",
//         body: "Ilorem Hopsom ahell asll2",
//     },
//     {
//         title: "Building a Blog3",
//         body: "Ilorem Hopsom ahell asll3",
//     }
    
// ])
// }
// insertPostData()
module.exports = router