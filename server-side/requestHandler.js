import userSchema from './models/user.model.js'
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
        console.log(username);
        
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
                res.status(200).send({msg:"Successfully Added"})
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
        const user=await userSchema.findOne({email})
        if(!user)
            return res.status(404).send({msg:"Invalid Email"})
        const success=await bcrypt.compare(password,user.password)
        if(!success)
            return res.status(404).send({msg:"Invalid Password"})
        const token= await sign({userId:user._id},process.env.JWT_KEY,{expiresIn:"24h"})
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
            subject: "OTP", // Subject line
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
        
         
        // res.status(200).send({msg:"Success"})
    } catch (error) {
        // res.status(404).send({msg:error})    
        console.log(error);
             
    }
}
