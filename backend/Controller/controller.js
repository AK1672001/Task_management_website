const User=require("../Modal/modal")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv");
const cookies = require("cookies");
dotenv.config();
const signup=async(req,res)=>{
     const {name,email,password}=req.body;
     try{
         const emails= await User.findOne({email})
         if(emails) return res.status(404).json({msg:"email already exist"})
            const hashpassword=await bcrypt.hash(password,10)
           const user= new User({
               name,
               email,
               password:hashpassword
           })
           await user.save();
           return res.status(200).json({msg:"Registered successfully",user});
     }
     catch(err){
        res.status(500).json({msg:err.message})
     }
}
const login=async(req,res)=>{
    const {password,email}=req.body;
    try{
          const user=await User.findOne({email});
          if(!user)return res.status(404).json({msg:"Please enter correct email"});
          const validpassword= await bcrypt.compare(password,user.password);
          if(!validpassword) return res.status(404).json({msg:"Please enter correct  password"})
          const token=await jwt.sign({userId:user._id,name:user.name},process.env.SECRET_JWT,{expiresIn:"7d"})
         res.cookie("token_amit", token, {
            httpOnly: true,
            
          })
         return res.status(200).json({msg:"logged in successfully",name:user.name,userId:user._id})
    }
    catch(err){
        return res.status(500).json({msg:err.message})
    }
}
const decode=async(req,res,next)=>{
   
      
        const token = req.cookies.token_amit;
    
        console.log("token",token)
        if (!token) {
          return res.status(401).json({ msg: "No token provided" });
        }
        else{
          jwt.verify(token, process.env.SECRET_JWT,(err,decode)=>{
              if(err){
                return res.status(401).json({ msg: "token is not okky" });
              }
              else{
                req.name=decode.name
                req.userId=decode.userId
                console.log("req.name",req.name)
                console.log("req.userId",req.userId)
                next();
              }
          })
        }
        
        
  
}
const verification=(req,res)=>{
     return res.status(200).json({msg:"success verification",name:req.name,userId:req.userId})
}

const logout=async(req,res)=>{
  try {

    res.clearCookie("token_amit", {
      httpOnly: true,
      
    });
    
    return res.status(200).json({ msg: "Logged out successfully" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
}
module.exports={signup,login,decode,verification,logout};