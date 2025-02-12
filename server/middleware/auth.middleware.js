// const jwt = require('jsonwebtoken')
// const User = require('../model/User.js')

import jwt from 'jsonwebtoken'
import User from  '../model/User.js'

export const authendicatedUser = async (req, res, next)=>{
    const cookies = req.cookies
    if(!cookies?.jwt)   return res.status(403).json({message:'Invalid token!'})
    
    const token = cookies.jwt
    const decode = jwt.verify(
        token,
        process.env.JWT_SECRET,
    )
    if(!decode) return res.status(403).json({message:'Invalid token!'})
    const user = await User.findOne({_id:decode.userId}).select('-password')

    if(!user ) return res.status(404).json({message:'user not found'})
    req.user = user 
    next()
}

// export default verifyJWT
// module.exports = verifyJWT