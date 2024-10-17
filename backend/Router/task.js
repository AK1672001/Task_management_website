const {taskpost,gettask,taskupdate,singletask,deletetask}=require("../Controller/task");
const Authenticate=require("../Middleware/Authenticate")
const express=require("express");

const taskrouter=express.Router();

taskrouter.post("/addtask",taskpost);
taskrouter.get("/gettask",gettask);
// taskrouter.get("/getonetask/:id",getonetask);
taskrouter.put("/taskupdate/:id",taskupdate);
taskrouter.get("/singletask/:id",singletask);
taskrouter.delete("/deletetask/:id",deletetask);
module.exports=taskrouter;