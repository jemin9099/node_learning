const userModel = require('../models/user')
async function updateUser(req, res) {  
    try{
        const {id} = req.params
        const user = await userModel.findOne({_id:id})        
        if(!user){
            throw new Error('User not found')
        }
        const data = await userModel.updateOne({_id:id},{$set:req.body})
        res.status(200).json({message:'User updated successfully',error:false,success:true,data:data})
    }catch(err){
        res.status(400).json({message:err.message,error:true,success:false,data:null})      
    } 
}
module.exports = updateUser