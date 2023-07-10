require('dotenv').config()
const flash = require('express-flash')

const express = require('express')
// you can set a default layout
const expressLayout = require('express-ejs-layouts')
// database connection
const connectDB = require('./server/config/db')

// cookie parser would be used to store the cookie when logged in
const cookieParser = require('cookie-parser');
const session = require("express-session")

const MongoStore = require('connect-mongo');
const methodOverride = require('method-override')


const app = express()
const PORT = 5000 || process.env.PORT

// database connection
connectDB()

// to be able to add data
app.use(express.urlencoded({extended: true}));
app.use(express.json())

// public folder
app.use(express.static('public'));


app.use(cookieParser())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    })
}))
//Flash message
app.use(flash())

// Templating Engine
app.use(expressLayout)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

// use the method override
app.use(methodOverride('_method'))

app.use('/', require('./server/routes/main'))
app.use('/', require('./server/routes/admin'))

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})