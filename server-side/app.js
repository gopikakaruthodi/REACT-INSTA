import express from 'express'
import env from 'dotenv'
import Connection from './connection.js'
import router from './router.js'
import cors from 'cors'

env.config()
const app=express()

app.use(cors())
app.use(express.json({limit:'50mb'}))
app.use("/api",router)

Connection().then(()=>{
    console.log("Database Connected");
    app.listen(process.env.PORT,()=>{
        console.log(`server running at http://localhost:${process.env.PORT}`);
    })
    

}).catch((error)=>{
    console.log(error);
    
})