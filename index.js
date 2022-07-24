const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const blogCategoryRoute = require('./routes/admin/blog/categories')
const cors = require('cors')

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

app.use('/api/blog/categories', blogCategoryRoute)

//error handler middleware
app.use((err, req, res, next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})

app.listen(5000, ()=>{
    console.log('connected to backend.')
})