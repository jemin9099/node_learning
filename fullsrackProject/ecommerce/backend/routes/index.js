const express = require('express')
const router = express.Router()
const userSignup = require('../controller/userSignup')
const userLogin = require('../controller/userSignin')
const userDetail = require('../controller/userDetail')
const authToken = require('../middleware/authToken')
const allUsers = require('../controller/allUsers')
const updateUser = require('../controller/updateUser')
router.post('/signup',userSignup)
router.post('/login',userLogin)
router.get('/user-detail',authToken,userDetail)

// admin-panel

router.get('/users',authToken,allUsers)
router.put('/update-user/:id',authToken,updateUser)
module.exports = router