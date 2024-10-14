const  userModel = require('../models/user')
const bcrypt = require('bcrypt')
 async function userSignup(req, res) {  
    try{
        const {name, email, password} = req.body   
        const user = await userModel.findOne({email})
        if(user){
            throw new Error('User already exists')
        }     
        if(!email){
            throw new Error('Email is required')
        }
        if(!name){
            throw new Error('Name is required')
        }
        if(!password){
            throw new Error('Password is required')
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hashSync(password, salt)
        if(!hashedPassword){
            throw new Error('Password hashing failed')
        }
        const payload = {
            ...req.body,
            role:'GENERAL',
            password:hashedPassword
        }
        const userData = new userModel(payload)
        const saveUser = await userData.save()
        res.status(201).json({message:'User created successfully',error:false,success:true,data:saveUser})
    }
    catch(err){
       res.status(400).json({message:err.message || err,error:true,success:false})
    }
}    

module.exports = userSignup