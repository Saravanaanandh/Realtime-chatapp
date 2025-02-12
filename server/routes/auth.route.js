// const express = require('express')
// const router = express.Router()
// const {
//     signUp,
//     login,
//     logout,
//     updateProfile,
//     checkAuth
// } = require('../controllers/authControllers.js')
// const authendicatedUser = require('./../middleware/auth.middleware.js')

import express from 'express' 
import {
    signUp,
    login,
    logout,
    updateProfile,
    checkAuth
} from "../controllers/authControllers.js"
import authendicatedUser from './../middleware/auth.middleware.js'
const router = express.Router()


router.post('/signup',signUp)
router.post('/login',login)
router.delete('/logout',authendicatedUser,logout)

router.put('/update-profile',authendicatedUser, updateProfile)
router.get('/check',authendicatedUser, checkAuth)

export default router
// module.exports = router