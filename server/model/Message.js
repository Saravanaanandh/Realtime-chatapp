// const mongoose = require('mongoose')
import mongoose from 'mongoose'

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


const Message = mongoose.model("Message", MessageSchema); 
export default Message;
// module.exports = mongoose.model('Message',MessageSchema)