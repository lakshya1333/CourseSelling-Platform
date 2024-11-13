import express from "express";
import { Router } from "express";
import db from './db.js'
const { adminModel } = db;
const {courseModel} = db;
const adminRouter = Router()
import jwt from 'jsonwebtoken'
import pass from './config.js'
const { JWT_ADMIN_PASSWORD } = pass 
import adminMiddleware from "./middleware/admin.js";

adminRouter.post("/signup",async (req,res) =>{
    const { email, password, firstName, lastName } = req.body;

    await adminModel.create({
        email: email,
        password: password,
        firstName: firstName, 
        lastName: lastName
    })
    res.json({
        message: "Admin Signed Up"
    })
})

adminRouter.post("/signin",async (req,res) =>{
    const { email, password} = req.body;
    const admin = await adminModel.findOne({
        email: email,
        password: password
    });

    if(admin){
        const token = jwt.sign({
            id: admin._id
        },JWT_ADMIN_PASSWORD);
        res.json({
            message: "Admin Signed in",
            token: token
        })
    }else{
        res.status(403).json({
            message: "Invalid credentials."
        })
    }
})

adminRouter.post("/course",adminMiddleware,async (req,res) =>{
    const adminid = req.userId
    const {title,description,price,imageURL} = req.body;

    const course = await courseModel.create({
        title: title,
        description: description,
        price: price,
        imageURL: imageURL,
        creatorId: adminid
    })
    res.json({
        message: "Course created",
        courseid: course._id
    })
})

adminRouter.put("/course",adminMiddleware,async (req,res) =>{
    const adminid = req.userId
    const {title,description,price,courseid} = req.body;

    const course = await courseModel.updateOne({
        _id: courseid,
        creatorId: adminid
    },{
        title: title,
        description: description,
        price: price,
    })
    res.json({
        message: "Course updated",
        courseid: course._id
    })
})

adminRouter.get("/course/bulk",adminMiddleware,async(req,res) =>{
    const adminid = req.userId

    const course = await courseModel.find({
        creatorId: adminid
    })
    res.json({
        message: "Course updated",
        course
    })
})


export default adminRouter