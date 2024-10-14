const userModel = require('../models/user')
async function userDetail(req, res) {  
    try{
        const user = await userModel.findOne({_id:req.user._id})
        if(!user){
            throw new Error('User not found')
        }
        res.status(200).json({message:'User details fetched successfully',error:false,success:true,data:user})
    }catch(err){
        res.status(400).json({message:err.message,error:true,success:false,data:null})      
    } 
}
module.exports = userDetail