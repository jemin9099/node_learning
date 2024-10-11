const express = require('express')
const User = require('../Models/User')
const Token = require('../Models/Token')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const {generateToken, verifiedEmail} = require('../utils/index')
const app = express()
const router = express.Router();
app.use(express.json())

router.get('/confirmed/:token',async(req,res) =>{
    try{
        let token = await Token.findOne({token:req.params.token})
        await User.updateOne({_id:token.userId},{verified:true})    
        await Token.findByIdAndDelete(token._id)    
        res.status(200).send('Account is verified')
    }
    catch(err){
        res.status(400).send('an arror occured')
    }
})
router.post('/register',async(req,res) =>{    
    let user = await User.findOne({email:req.body.email})
    if(user) return res.status(400).send('user already exist')
     user = new User({
        name:req.body.name,
        email:req.body.email,
        password: await bcrypt.hash(req.body.password,10)
    })
    const result = await user.save()
    const token = new Token({
        userId:result._id,
        token:crypto.randomBytes(16).toString('hex')
    })
    await token.save()
    const url = `${process.env.BASE_URL}/user/confirmed/${token.token}` 
    await verifiedEmail(result.email,url)
    res.status(201).send(result)
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