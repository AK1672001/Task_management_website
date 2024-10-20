const express = require("express");
const mongoose = require("mongoose");
const router = require("./Router/router");
const taskrouter = require("./Router/task");
const path = require('path');
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
const server = express();
const cors = require("cors");
server.use(
    cors({
      origin: ["http://localhost:3000",'https://task-management-website-865l.onrender.com'],
      credentials: true,
    })
  );
  
server.use(cookieParser());
server.use(express.json());
server.use(router);
server.use(taskrouter);


server.listen(process.env.PORT, () => {
  console.log(`server is running ${process.env.PORT}`);
});

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("database is connect");
  })
  .catch((err) => {
    console.log(err);
  });

  const dirname=path.resolve();
  server.use(express.static(path.join(dirname,'/frontend/build')));
  server.get("*",(req,res)=>{
      res.sendFile(path.join(dirname,"frontend",'build','index.html'))
  })