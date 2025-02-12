// require('dotenv').config()
// // require('express-async-errors')
// const mongoose = require('mongoose')
// const connectDB = require('./config/dbConn.js')
// const express = require('express')
// const path = require('path')
// const authRoutes = require('./routes/auth.route.js')
// const messageRoutes = require('./routes/message.route.js')
// const authendicatedUser = require('./middleware/auth.middleware.js')
// const cors = require('cors')
// const cookieParser = require('cookie-parser')
// const multer = require("multer");
// const upload = multer({ limits: { fileSize: 50 * 1024 * 1024 } });
// const {app, server} = require('./config/socket.js') 

const PORT = process.env.PORT || 5000
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import connectDB from './config/dbConn.js'
import express from 'express'
import path from 'path'
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import authendicatedUser from './middleware/auth.middleware.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import {app, server} from './config/socket.js'

dotenv.config()
app.use(cors({
    origin:"http://localhost:5173" ,
    methods: "GET,POST,PATCH,PUT,DELETE",
    allowedHeaders: ["Content-Type"],
    credentials:true
}))

app.use(cookieParser()) 
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/message',authendicatedUser,messageRoutes) 

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,'./../client/dist')))

    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,"../client","dist","index.html"))
    })
}
server.listen(PORT, ()=>{
    console.log("server running on PORT "+PORT)
    connectDB()
})

