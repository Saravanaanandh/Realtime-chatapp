const express = require('express')
const router = express.Router()
const {
    getAllUser,
    getMessage,
    sendMessage
} = require('./../controllers/messageController.js')


router.get('/users',getAllUser)
router.get('/:id',getMessage)
router.post('/:id',sendMessage)

module.exports = router