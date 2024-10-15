const jwt = require('jsonwebtoken')
const userModel = require('../models/user')
async  function authToken (req, res, next) {  
    try{
        const token = await req.headers['authorization']?.split(' ')[1];       
        
        if(!token){
            throw new Error('Token not found')
        }
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        if(!payload){
            throw new Error('Invalid token')
        }
        const user = await userModel.findOne({_id:payload._id})
        if(!user){
            throw new Error('User not found')
        }
        req.user = user
        next()
    }catch(err){
        res.status(401).json({message:err.message,error:true,success:false,data:null})      
    } 
}

module.exports = authToken