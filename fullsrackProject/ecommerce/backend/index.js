const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const router = require('./routes/index')
require('dotenv').config()
const connectDB = require('./config/db')
const app = express()
app.use('/uploads', express.static('uploads')); 
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({extends:true}))
app.use(cors())
app.use(cookieParser())
app.use('/api',router)
const Port = process.env.PORT
connectDB().then(() =>{
    app.listen(Port,() =>{
        console.log(`server is running on port ${Port}`);
    })
})