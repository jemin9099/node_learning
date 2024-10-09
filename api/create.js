const express = require('express')
require('../db/config')
const Profile = require('../profile')
const app = express()
app.use(express.json())
app.post('/create',async(req,res) =>{
    console.log(req.body);
    const data = new Profile(req.body)
    const result = await data.save()
    res.status(201).send(result)
})
app.get('/list',async(req,res) =>{
    let data = await Profile.find()
    res.send(data)
})
app.delete('/delete/:id',async(req,res) =>{
    let data = await Profile.deleteOne({_id:req.params.id})
    res.send(data)                                  
})
app.put('/update/:id',async(req,res) =>{
    let data = await Profile.updateOne({_id:req.params.id},{$set:req.body})
    res.send(data)
})
app.listen(5000)