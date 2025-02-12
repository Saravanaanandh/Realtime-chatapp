const express = require('express')
const router = express.Router()
const {
    signUp,
    login,
    logout,
    updateProfile,
    checkAuth
} = require('../controllers/authControllers.js')
const authendicatedUser = require('./../middleware/auth.middleware.js')

router.post('/signup',signUp)
router.post('/login',login)
router.delete('/logout',authendicatedUser,logout)

router.put('/update-profile',authendicatedUser, updateProfile)
router.get('/check',authendicatedUser, checkAuth)

module.exports = router