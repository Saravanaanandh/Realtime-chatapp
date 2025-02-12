const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    receiverId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    text:String,
    image:{
        type:String,
        default:""
    }
},{timestamps:true})

module.exports = mongoose.model('Message',MessageSchema)