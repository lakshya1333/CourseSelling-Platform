import mongoose, { mongo, Schema } from "mongoose";
import { ObjectId } from "bson"

const userSchema = new Schema({
    email: {type: String,unique: true},
    password: String,
    firstName: String,
    lastName: String,
})

const adminSchema = new Schema({
    email: {type: String,unique: true},
    password: String,
    firstName: String,
    lastName: String,
})

const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageURL: String,
    creatorId: ObjectId,
})

const purchaseSchema = new Schema({
    userId: ObjectId,
    courseId: ObjectId,
})


const userModel = mongoose.model("user",userSchema)
const adminModel = mongoose.model("admin",adminSchema)
const courseModel = mongoose.model("course",courseSchema)
const purchaseModel = mongoose.model("purchase",purchaseSchema)

export default {userModel,adminModel,courseModel,purchaseModel}