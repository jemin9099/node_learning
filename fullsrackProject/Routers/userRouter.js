const express = require('express')
const User = require('../Models/User')
const bcrypt = require('bcryptjs')
const {generateToken} = require('../utils/index')
const app = express()
const router = express.Router();
app.use(express.json())
router.post('/register',async(req,res) =>{    
    let user = await User.findOne({email:req.body.email})
    if(user) return res.send('user already exist')
     user = new User({
        name:req.body.name,
        email:req.body.email,
        password: await bcrypt.hash(req.body.password,10)
    })
    const result = await user.save()
    res.send(result)
})
router.post ('/login',async(req,res) =>{
    let user = await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send('user not found')
    if(await bcrypt.compare(req.body.password,user.password)){
        res.status(200).send({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user)
        })
    }
    else{
        res.status(400).send({message:'invalid password'})
    }
})
module.exports = router