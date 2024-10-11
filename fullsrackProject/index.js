const express = require('express')
const mongooes = require('mongoose')
const  cors = require('cors')
require('dotenv').config()
mongooes.connect(process.env.MONGO_URL ) 
const app = express()
app.use(express.json())
app.use(cors())
app.use('/user',require('./Routers/userRouter'))
app.use('/client',require('./Routers/clientRouter'))
app.get('/',(req,res) =>{
    res.send('hello world')
})
app.listen(process.env.PORT || 3000)