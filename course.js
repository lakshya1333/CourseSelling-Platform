import express from "express"
import { Router } from "express"
import db from './db.js'
const { purchaseModel } = db;
const { courseModel } = db;
const courseRouter = Router()
import userMiddleware from "./middleware/user.js";

courseRouter.post('/purchase',userMiddleware,async (req,res)=>{
    const userId = req.userId
    const courseId = req.body.courseId
    await purchaseModel.create({
        userId,
        courseId
    })
        res.json({
            message: "You have bought the course now go and study"
        })
    })
    
courseRouter.get('/preview',async (req,res)=>{
    const courses = await courseModel.find({})
        res.json({
            message: "Preview of course"
        })
    })
    



export default courseRouter;