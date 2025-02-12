const {Server} = require('socket.io')
const http = require('http')

const express = require('express')
const app = express()


const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origin:["http://localhost:5173"]
    },
})

const userSocket = {}

const getReceiverSocketId = (userId)=>{
    return userSocket[userId]
}

io.on("connection",(socket)=>{
    console.log(`a user connected ${socket.id}`)
    const userId = socket.handshake.query.userId

    if(userId) userSocket[userId] = socket.id
    io.emit("getOnlineUsers",Object.keys(userSocket))

    socket.on("disconnect",()=>{
        console.log("a user disconnected ",socket.id)
        delete userSocket[userId]
        io.emit("getOnlineUsers",Object.keys(userSocket))

    })
})

module.exports = {io, app, server,getReceiverSocketId}