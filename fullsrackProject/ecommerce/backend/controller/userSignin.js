const bcrypt = require('bcrypt')
const userModel = require('../models/user')
const {generateToken} = require('../utils/index')
async function userSignin(req, res) {  
    try{
        const {email, password} = req.body
        if(!email){
            throw new Error('Email is required')
        }
        if(!password){
            throw new Error('Password is required')
        }
        const user = await userModel.findOne({email})
        if(!user){
            throw new Error('User not found')
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword){
            throw new Error('Invalid password')
        }
        const payload = {
            _id:user._id,
            email:user.email,
        }       
        const token = generateToken(payload)
        const tokenOptions = {
            httpOnly:true,
            secure:true,
        }
        res.cookie('token',token,tokenOptions).status(200).json({message:'User logged in successfully',error:false,success:true,data:token})
    }catch(err){
        res.status(400).json({message:err.message,error:true,success:false,data:null})      
    }
}

module.exports = userSignin