const mongoose=require("mongoose");
const validator=require("validator")
const userShema=new mongoose.Schema({
    name:{
       type:String,
       require:true
    },
    email:{
       type:String,
       require:true,
       validate:[validator.isEmail,"please validator email"]
       
    },
    password:{
        type:String,
        require:true
    },
    
   
   
})

const User= mongoose.model("User",userShema);
module.exports=User;