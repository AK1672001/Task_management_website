const {taskpost,gettask,taskupdate,singletask,deletetask}=require("../Controller/task");

const express=require("express");

const taskrouter=express.Router();

taskrouter.post("/addtask",taskpost);
taskrouter.get("/gettask",gettask);
taskrouter.get("/singletask/:id",singletask);
taskrouter.put("/taskupdate/:id",taskupdate);

taskrouter.delete("/deletetask/:id",deletetask);
module.exports=taskrouter;