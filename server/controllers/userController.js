const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const jwtSecret= process.env.JWT_SECRET
const adminLayout = "../views/layouts/admin"


const createRegister = (req, res) => {
    const messages =  req.flash('info');
    res.render('admin/register', {layout: adminLayout, messages})
}

const storeRegister = async (req, res) => {
    const {firstname, lastname, email,  password,  password_confirmation, phone }  = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try{
        const existingEmail = User.find({email: req.body.email, })
        if(req.body.password != req.body.password_confirmation){
            await req.flash('info', 'Incorrect  Password')
            res.redirect('/admin/register');
        }
        else{
            const user =  await User.create({firstname, lastname, email, phone, password:hashedPassword})
            await req.flash('info', 'Successfully Created')
            res.redirect('/admin/register');
        }
        
        res.send(req.body)
        // const user =  await User.create({username, email, password:hashedPassword})
        // res.status(201).json({message: 'User Created', user})

    }catch(e){
        console.log(e);
    }
}

const createLogin = async(req, res) => {
    try {
        const messages =  req.flash('info');
        res.render('admin/login', {layout: adminLayout, messages})
    } catch (error) {
        console.log(error);
    }
}

const storeLogin = async (req, res) => {
    try{
        const {email, password}  = req.body;
        const user = await User.findOne({ email });

        if(!user){
            await req.flash('info', 'Invalid Credential')
            res.redirect('/admin/login');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            await req.flash('info', 'Invalid Credential')
            res.redirect('/admin/login');
        }
        const token = jwt.sign({userId: user._id}, jwtSecret)
        res.cookie('token', token, {httpOnly: true } )
        res.redirect('/admin/dashboard')
    }catch(e){

    }
}

const logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/admin/login')
}

module.exports = { createLogin, storeLogin, createRegister, storeRegister, logout}