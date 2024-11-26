import jwt from "jsonwebtoken"
import userSchema from "../models/user.model.js"
const {verify}=jwt

export default async function Auth(req,res,next){
    try {
        // console.log("middleware");
        // console.log(req.headers.authorization);
        const key=req.headers.authorization;
        // console.log(key);
        
        if(!key){  
            return res.status(403).send("Unautherized access")
        }
        const token=key.split(" ")[1]
        // console.log(token);
        const auth=await verify(token,process.env.JWT_KEY)
        // console.log(auth);
        req.user=auth
        next() 
    } catch (error) {
        return res.status(404).send({msg:"Session Timeout,Please Login Again"})
    }
}