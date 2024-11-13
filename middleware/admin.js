import jwt, { decode } from 'jsonwebtoken'
import pass from '../config.js'
const { JWT_ADMIN_PASSWORD } = pass 
function adminMiddleware(req,res,next){
    const token = req.headers.token
    const decoded = jwt.verify(token,JWT_ADMIN_PASSWORD)
    if(decoded){
        req.userId = decoded.id
        next()
    }else{
        res.status(403).json({
            message:"You are not signed in"
        })
    }


}

export default adminMiddleware