const jwt = require('jsonwebtoken');
const User = require('../models/User')
require('dotenv').config();
require('cookie-parser')

// auth 
exports.auth=(req, res, next)=>{
    try {
        // const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ", "")
        let token =  req.header("Authorization").replace("Bearer ", "");

        if(!token){
            return res.status(401).json({
                success:false,
                messege:"please provide token"
            })
        }
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            req.user= payload
        } catch (error) {
            return res.status(401).json({
                success:false,
                messege:"token is invalid"
            })
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success:false,
            messege:"Something went wrong while verifying the token"
        })
    }
}


exports.isBuyer= async(req, res, next)=>{
    try {
        console.log(req.user.accountType);
        const user = await User.findOne({email:req.user.email})
        if(user.accountType!=='Buyer'){
            return res.status(401).json({
                success:false,
                messege:"This is a protected route for students"
            })
        }
        next();
        
    } catch (error) {
        return res.status(401).json({
            success:false,
            messege:"Roles do not match"
        })
    }
}

exports.isDeliveryGuy= async(req, res, next)=>{
    try {
        const user = await User.findOne({email:req.user.email})
        if(user.accountType!=='DeliveryGuy'){
            return res.status(401).json({
                success:false,
                messege:"This is a protected route for Delivery Guy"
            })
        }
        next();
        
    } catch (error) {
        return res.status(401).json({
            success:false,
            messege:"Roles do not match"
        })
    }
}


exports.isAdmin= async(req, res, next)=>{
    try {
        
        const user=await User.findOne({email:req.user.email});
        if(user.accountType!=='Admin'){
            return res.status(401).json({
                success:false,
                messege:"This is a protected route for admins"
            })
        }
        next();
        
    } catch (error) {
        return res.status(401).json({
            success:false,
            messege:"Roles do not match"
        })
    }
}
