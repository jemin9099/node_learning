const jwt = require('jsonwebtoken')
const generateToken = (payload) => {
    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
            expiresIn: '30d',
        }
    )
}
module.exports = {generateToken}

// PORT=3000
// MONGO_URI=mongodb+srv://jemin99:jemin9099@ecommerce.yb0l3.mongodb.net/Ecommerce?retryWrites=true&w=majority&appName=Ecommerce
// JWT_SECRET=XuXHzGp14u5jPrgO7vp7qLFZnairn1eP97f1kpofCnRxZnODtID+d6DdmGed4OwO48PSCYCpw5Yq6WxwEPJspknVzy7n3qx2FNAhgaRJh7uyNpNYbV/vAE3MS2/ulg3kCpIU8QpH17vG3yI4nmFcG994d7ugnNesaqOST3US/cJi8LVrAbRE8iPOH8I2DqgfGDwrwBOuo5LMRWUZFCUE+VflNanNTkXAxeb6L+nQiU7IwJEG0VynQ8ftdmGrN9otclt1HSNYP17sQYkHG1qQ/2G0TJZ4JVGMx4M+sH9jV/7izpuZq2hVAINlR6LTJonGxMjlfNTSV4wGnpB50xfG4w==
// BACKEND_URL=http://localhost:3000