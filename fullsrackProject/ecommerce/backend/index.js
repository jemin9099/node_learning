const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const router = require('./routes/index')
require('dotenv').config()
const connectDB = require('./config/db')
const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use('/api',router)
const Port = process.env.PORT
connectDB().then(() =>{
    app.listen(Port,() =>{
        console.log(`server is running on port ${Port}`);
    })
})