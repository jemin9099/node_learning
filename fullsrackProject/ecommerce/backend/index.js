const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const router = require('./routes/index')
require('dotenv').config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({extends:true}))
app.use('/uploads', express.static('uploads')); 
const connectDB = require('./config/db')
app.use(cookieParser())
app.use(cors())
app.use('/api',router)
const Port = process.env.PORT
connectDB().then(() =>{
    app.listen(Port,() =>{
        console.log(`server is running on port ${Port}`);
    })
})