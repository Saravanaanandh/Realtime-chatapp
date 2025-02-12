// const express = require('express')
// const router = express.Router()
// const {
//     getAllUser,
//     getMessage,
//     sendMessage
// } = require('./../controllers/messageController.js')

import express from 'express' 
import {
    getAllUser,
    getMessage,
    sendMessage
} from "../controllers/messageController.js" 
const router = express.Router()

router.get('/users',getAllUser)
router.get('/:id',getMessage)
router.post('/:id',sendMessage)

export default router

// module.exports = router