const express = require('express')
const Client = require('../Models/Client')
const bcrypt = require('bcryptjs')
const {sendOtp} = require('../utils/index')
const app = express()
const router = express.Router();
app.use(express.json())

router.post('/create',async(req,res) =>{    
    const { phone } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const client = await Client.findOneAndUpdate(
        { phone },
        { otp, otpExpiration: Date.now() + 10 * 60 * 1000 }, // OTP valid for 10 minutes
        { new: true, upsert: true }
      );
      try {
        await sendOtp(phone, otp);
        res.status(200).json({ message: 'OTP sent successfully!' });
      } catch (error) {
        res.status(500).json({ message: 'Error sending OTP', error });
      }
})
// router.post('/login',async(req,res) =>{
//     let user = await Client.findOne({email:req.body.email})
//     if(!user) return res.status(400).send('user not found')
//     if(await bcrypt.compare(req.body.password,user.password)){
//         res.status(200).send({
//             _id:user._id,
//             name:user.name,
//             email:user.email,
//             token:generateToken(user)        
//         })
//     }    
//     else{
//         res.status(400).send({message:'invalid password'})
//     }
// })  
module.exports = router