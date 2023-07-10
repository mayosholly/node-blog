const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const jwtSecret= process.env.JWT_SECRET


const postController = require('../controllers/postController')
const userController = require('../controllers/userController')

const adminLayout = "../views/layouts/admin"

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
            req.flash('info', 'Please, You need to log in')
            res.redirect('/admin/login');
        // return res.status(401).json({message: "Unauthorized"});
    }
    try{
        const decoded = jwt.verify(token, jwtSecret);
        req.userId = decoded.userId;
        next();
    }catch(e){
        console.log(e);
    }
}

router.get('/admin/dashboard',  authMiddleware,  (req, res) => {
    const messages =  req.flash('info');
    res.render('admin/index', {layout: adminLayout, messages})
})

router.get('/admin/post',  authMiddleware, postController.index)
router.get('/admin/post/create',  authMiddleware, postController.create)
router.post('/admin/post',  authMiddleware, postController.store)
router.get('/admin/post/:id',  authMiddleware, postController.edit)
router.put('/admin/post/:id/edit',  authMiddleware, postController.update)
router.delete('/admin/post/:id',  authMiddleware, postController.destroy)

router.get('/admin', (req, res) => {
    res.render('admin/index', {layout: adminLayout})
});



router.get('/admin/register', userController.createRegister)
router.post('/admin/register', userController.storeRegister)
router.get('/admin/login',  userController.createLogin)
router.post('/admin/login', userController.storeLogin)
router.get('/logout', userController.logout)


module.exports = router
