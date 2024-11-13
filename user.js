import express from "express"
import { Router } from "express"
import db from './db.js';
const { userModel } = db;
const { purchaseModel } = db;
const userRouter = Router()
import jwt from 'jsonwebtoken'
import pass from './config.js'
const { JWT_PASSWORD } = pass 
import userMiddleware from "./middleware/user.js";

userRouter.post("/signup",async (req,res) =>{
    const { email, password, firstName, lastName } = req.body;

    await userModel.create({
        email: email,
        password: password,
        firstName: firstName, 
        lastName: lastName
    })
    res.json({
        message: "Signed Up"
    })
})

userRouter.post("/signin",async (req,res) =>{
    const { email, password} = req.body;
    const user = await userModel.findOne({
        email: email,
        password: password
    });

    if(user){
        const token = jwt.sign({
            id: user._id
        },JWT_PASSWORD);
        res.json({
            message: "Signed in",
            token: token
        })
    }else{
        res.status(403).json({
            message: "Invalid credentials."
        })
    }
})

userRouter.get("/purchases",userMiddleware,async (req,res)=>{
    const userId = req.userId
    const purchases = await purchaseModel.findOne({
        userId
    })
    res.json({
        message: "Your courses",
        purchases
    })
})



export default userRouter;
