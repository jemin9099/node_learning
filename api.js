const express = require('express')
const dbConnect = require('./db/mongodb')
const app = express()
app.use(express.json())
app.get('/basicApi',async(req,res) =>{
    let data = await dbConnect()
    data = await data.find().toArray()
    console.log(data)
    res.send(data)
})
app.get('/basicApi/search',async(req,res) =>{
    let data = await dbConnect()    
    data = await data.find(req.query).toArray()
    if(data.length === 0){
        res.send('data not found')
    }
    else{
        res.send(data)
    }
})
app.post('/basicApi/add',async(req,res) =>{
    let data = await dbConnect()
    let response = await data.insertOne(req.body)
    res.send(response)
    
})
app.put('/basicApi/update/:name',async(req,res) =>{
    let data = await dbConnect()    
    let response = await data.updateOne({performer:req.params.name},{$set:req.body})
    res.send(response)
})

app.delete('/basicApi/delete/:id',async(req,res) =>{
    let data = await dbConnect()    
    let response = await data.deleteOne({performer:'Nia Lyne'})
    res.send(response)
})
app.listen(5000)