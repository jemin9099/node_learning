const express = require('express')
const router = express.Router()
const userSignup = require('../controller/userSignup')
const userLogin = require('../controller/userSignin')
const userDetail = require('../controller/userDetail')
const authToken = require('../middleware/authToken')

router.post('/signup',userSignup)
router.post('/login',userLogin)
router.get('/user-detail',authToken,userDetail)
module.exports = router