const express = require('express')
require('../db/config')
const Profile = require('../profile')
const app = express()
app.use(express.json())
app.get('/search/:key',async(req,res) =>{  
    console.log(typeof req.params.key);
        
    let data = await Profile.find({
        "$or":[
            {"performer":{$regex:req.params.key}},
            {"genre":{$regex:req.params.key}},
        ]
    })
    res.send(data)
})

app.listen(5000)