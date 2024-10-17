const express=require("express")
const mongoose=require("mongoose")
const router=require("./Router/router")
const taskrouter=require("./Router/task")
const Authenticate=require("./Middleware/Authenticate")
const dotenv=require("dotenv")
dotenv.config();
const server=express();
const cors=require('cors')
server.use(express.json())
server.use(router)
server.use(taskrouter);
server.use(Authenticate)

server.use(cors(
    { 
        origin:"http://localhost:3000",
        credentials:true

    }
    
))
server.listen(process.env.PORT,()=>{
    console.log(`server is running ${process.env.PORT}`)
})

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("database is connect");
})
.catch((err)=>{
    console.log(err)
})

