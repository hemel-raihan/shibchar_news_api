const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

//backend
const blogCategoryRoute = require('./routes/admin/blog/categories')
const blogPostRoute = require('./routes/admin/blog/posts')
const authRoute = require('./routes/admin/auth')

//frontend
const homeRoute = require('./routes/frontend/home')

const cors = require('cors')
const fileUpload = require('express-fileupload')

const app = express()

dotenv.config();
app.use(express.json())

app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000','']
}))

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () =>{
    console.log('connected to the database')
})

app.use(fileUpload({
    useTempFiles: true
}))

//routes backend middleware
app.use('/api/blog/categories', blogCategoryRoute)
app.use('/api/blog/posts', blogPostRoute)
app.use('/api/auth', authRoute)

//routes frontend middleware
app.use('/api/home', homeRoute)

//error handler middleware
app.use((err, req, res, next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        //stack: err.stack
    })
})

app.listen(5000, ()=>{
    console.log('connected to backend.')
})