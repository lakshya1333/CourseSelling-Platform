import jwt, { decode } from 'jsonwebtoken'
import pass from '../config.js'
const { JWT_PASSWORD } = pass 
function userMiddleware(req,res,next){
    const token = req.headers.token
    const decoded = jwt.verify(token,JWT_PASSWORD)
    if(decoded){
        req.userId = decoded.id
        next()
    }else{
        res.status(403).json({
            message:"You are not signed in"
        })
    }


}

export default userMiddleware