const User=require("../Modal/modal")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")
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
           return res.status(200).json({msg:"signup successfully",user});
     }
     catch(err){
        res.status(500).json({msg:err.message})
     }
}
const login=async(req,res)=>{
    const {password,email}=req.body;
    try{
          const user=await User.findOne({email});
          if(!user)return res.status(404).json({msg:"please correct email"});
          const validpassword= await bcrypt.compare(password,user.password);
          if(!validpassword) return res.status(404).json({msg:"please correct this password"})
          const token=await jwt.sign({id:user._id,name:user.name},process.env.SECRET_JWT,{expiresIn:"2d"})
          console.log("token is",token)
          return res.status(200).json({msg:"login in success",user,token})
    }
    catch(err){
        return res.status(500).json({msg:err.message})
    }
}
module.exports={signup,login};