import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose';
const app = express()
const port = 3000;
import courseRouter from './course.js';
import userRouter from './user.js';
import adminRouter from './admin.js';
app.use(express.json());

app.use("/user",userRouter)
app.use("/admin",adminRouter)
app.use("/course",courseRouter)


async function main(){
    console.log(process.env.MONGO_URL);
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(port,() =>{
       console.log("App running on port 3000")
    })
}

main()