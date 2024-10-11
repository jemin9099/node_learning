const jwt = require('jsonwebtoken')
const twilio = require('twilio');
const nodemailer = require('nodemailer')
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
 const generateToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '30d',
        }
    )
}
const verifiedEmail = (email , link) => {
    try{
        let transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.EMAIL,
                pass:process.env.PASSWORD
            }
        })
        let mailOptions = {
            from:process.env.EMAIL,
            to:email,
            subject:'Email verification',
            html:`
            <p>Welcome to fullsrack</p>
            <a href=${link}>Click here to verify your account</a>
            `
        }
        transporter.sendMail(mailOptions,(err,info) => {
            if(err){
                console.log(err)
            }
            else{
                console.log('email sent',info.response)
            }
        })
    }catch(err){
        console.log(err)
    }
}

async function sendOtp(phone, otp) {
 await  client.verify.v2.services("VA777e9665ddb64055fc81ace78cb5cf5a")
      .verifications
      .create({to: phone, channel: 'sms'})
      .then(verification_check => console.log(verification_check.sid));

}
module.exports = {generateToken,verifiedEmail,sendOtp} 
