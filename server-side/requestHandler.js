import userSchema from './models/user.model.js'
import profileSchema from './models/userdata.model.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
const{sign}=jwt

const transporter = nodemailer.createTransport({
   service:"gmail",
    auth: {
      user: "jazzcazz02@gmail.com",
      pass: "huhm lfcr wtaj qgbg",
    },
  });

export  async  function signup(req,res){
    try {
        const{username,email,password,cpassword}=req.body
        // console.log(username,email,password,cpassword);
        
        if(!(username&&email&&password&&cpassword)){
            return res.status(404).send({msg:"Fields are empty"})
        } 
        const emailExist=await userSchema.findOne({email})
        if(emailExist)
            return res.status(404).send({msg:"Email already exist"})
        if(password!=cpassword)
            return res.status(404).send({msg:"Password not matching"})
        bcrypt.hash(password,10).then(async(hashedPassword)=>{
            await userSchema.create({username,email,password:hashedPassword}).then(async()=>{
                res.status(201).send({msg:"Successfully Registered"})
            }).catch((error)=>{
                res.status(404).send({msg:error})
            })
        })
    } catch (error) {
        console.log(error);
        // res.status(404).send({msg:error}) 
    }
}

export async function signin(req,res) {
    try{
        const{email,password}=req.body 
        if(!(email&&password))
            return res.status(404).send({msg:"Fields are empty"})  
        const usr=await userSchema.findOne({email})
        if(!usr)
            return res.status(404).send({msg:"Invalid Email"})
        const success=await bcrypt.compare(password,usr.password)
        if(!success)
            return res.status(404).send({msg:"Invalid Password"})
        const token= await sign({userId:usr._id},process.env.JWT_KEY,{expiresIn:"24h"})
        // console.log(token);
        res.status(200).send({msg:"Successfully logged in",token})
        
    } catch (error) {
        // console.log(error); 
        res.status(404).send({msg:error})         
    }
}

export async function checkEmail(req,res) {
    try {
        const {email}=req.body
        const info = await transporter.sendMail({
            from: 'jazzcazz02@gmail.com', // sender address
            to: `${email}`, // list of receivers
            subject: "Email Verification", // Subject line
            text: "Verification", // plain text body
            html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Account Verification</title>
        <style>
            body {
                font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
                color: #3d3d3d;
                border-radius: 6px;
            }
            .email-container {
                width: 100%;
                max-width: 300px;
                margin: 0 auto;
                background-color: #eff7fa;
                border: 1px solid #ddd;
                padding: 20px;
                border-radius: 8px;
                text-align: center;
            }
            .btn {
                display: inline-block;
                background-color: rgb(17, 161, 251);
                color: #fff;
                text-decoration: none;
                padding: 10px 20px;
                margin-top: 20px;
                border-radius: 50px;
                font-size: 18px;
                text-align: center;
            }
        </style>
    </head>
    <body>

        <div class="email-container">
            <p>Hello Sir/Madam</p>
            <p>Please verify your email address by clicking the button below.</p>
            <a href="http://localhost:5173/signup" class="btn">Verify Your Account</a>
        </div>

    </body>
    </html>`, // html body
          });
        
         
        res.status(200).send({msg:"Success"})
    } catch (error) {
        console.log(error);
        res.status(404).send({msg:error})    
             
    }
}

export async function getUser(req,res){
    try {
        // console.log(req.user);
        const _id=req.user.userId
        const user=await userSchema.findOne({_id})
        const profile=await profileSchema.findOne({userID:_id},{_id:0,profile:1})
        console.log(user);
        const username=user.username
        res.status(200).send({username:username,profile:profile})
        
    } catch (error) {
        console.log(error);
        res.status(404).send({msg:error})    

        
    }
}
export async function editUserData(req,res){
    try {
        const{username,email,profile,bio,gender,phone}=req.body
        console.log(username,email)
        const _id=req.user.userId
        // console.log(_id);
        const user=await profileSchema.findOne({userID:_id})
        console.log(user);
      
        if(!user){
            
            await userSchema.updateOne({_id},{$set:{username,email}})
            await profileSchema.create({profile,bio,gender,phone,userID:_id}).then(()=>{
               return res.status(201).send({msg:"Successfully Added"})
            }).catch((error)=>{
                console.log(error);
                res.status(404).send({msg:error})    
            })
        }
        else{
            await userSchema.updateOne({_id},{$set:{username,email}})
            await profileSchema.updateOne({userID:_id},{$set:{profile,bio,gender,phone}}).then(()=>{
               return res.status(201).send({msg:"Successfully Updated"})
            }).catch((error)=>{
                console.log(error);
                res.status(404).send({msg:error})    
            })
        }
    } catch (error) {
        console.log(error);
        res.status(404).send({msg:error})    

        
    }
}
export async function getUserData(req,res){
    try {
    //    console.log(req.user.userId);
       const userID=req.user.userId
       const profileData= await profileSchema.findOne({userID})
       const userData= await userSchema.findOne({_id:userID},{username:1,email:1})
       res.status(200).send({userData,profileData:profileData})  
    } catch (error) {
        console.log(error);
        res.status(404).send({msg:error})    

        
    }
}

export async function deleteUser(req,res){
    try {
        const _id=req.params
        await userSchema.deleteOne({_id}).then(async()=>{
            await profileSchema.deleteOne({userID:_id}).then(()=>{
                res.status(200).send({msg:"Successfully Deleted"})

            }).catch((error)=>{
                console.log(error);
                res.status(404).send({msg:error})
            })
        })
    } catch (error) {
        console.log(error);
        res.status(404).send({msg:error}) 
    }
}

export async function addPost(req,res) {
    try {
        console.log("hhh");
        
        const{...post}=req.body
        
    } catch (error) {
        console.log(error);
        
    }
    
}

