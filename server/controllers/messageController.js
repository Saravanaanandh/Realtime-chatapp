// const User = require("../model/User.js")
// const Message = require("../model/Message.js")
// const cloudinary = require('./../config/cloudinary.js')
// const { io,getReceiverSocketId } = require("../config/socket.js")

import User from "../model/User.js"
import Message from "../model/Message.js"
import cloudinary from './../config/cloudinary.js'
import {io,getReceiverSocketId } from "../config/socket.js"

export const getAllUser = async(req, res)=>{ 
    try{
        const loggedId = req.user._id
        const users = await User.find({_id:{$ne:loggedId}}).select('-password')
        res.status(200).json(users)
    }catch(err){
        res.status(500).json({message:"Internal server error"})
    }
}

export const getMessage = async(req, res)=>{
    const myId = req.user._id
    const {id:receiverId} = req.params

    const messages = await Message.find({
        $or:[
            {senderId:myId, receiverId:receiverId},
            {senderId:receiverId, receiverId:myId}
        ]
    })

    res.status(200).json(messages)
}
export const sendMessage = async(req, res)=>{
    const {text, image} = req.body

    const senderId = req.user._id
    const {id:receiverId} = req.params
    let imageUrl;
    try{
        if(image){
            const uploaderResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploaderResponse.secure_url
        }
    
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl
        })
        await newMessage.save()
        //websocket logics
        const receiverSocketId = getReceiverSocketId(receiverId)
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage)
        } 
        res.status(201).json(newMessage)
    }catch(err){
        res.json({message:err})
    }
} 

// export default {
//     getAllUser,
//     getMessage,
//     sendMessage,
// }
// module.exports = {
//     getAllUser,
//     getMessage,
//     sendMessage
// }