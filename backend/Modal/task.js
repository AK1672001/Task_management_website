const mongoose=require("mongoose")

const taskschema=new mongoose.Schema({

    task:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference the User model
        required: true
    },

})
const Task= mongoose.model("Task",taskschema)
module.exports=Task;