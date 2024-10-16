const  userModel = require('../models/user')
async function allUsers(req, res) {  
    try{
        const users = await userModel.find({
            name:new RegExp(req.query.name,'i')
        })
       
        res.status(200).json({message:'Users fetched successfully',error:false,success:true,data:users})
    }catch(err){
        res.status(400).json({message:err.message,error:true,success:false,data:null})      
    } 
} 
module.exports = allUsers