const Task=require("../Modal/task");
const User=require("../Modal/modal")
const mongoose=require("mongoose");
const taskpost=async(req,res)=>{
    
    const {task,description,userId}=req.body;
    try{
        if(!task || !description)
            return res.status(404).json({msg:"task and description fill"})
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ msg: "User not found" });
        }
       
        
         const newtask=new Task({
             task,
             description,
             user:userId
            
         })
         await newtask.save();
         return res.status(200).json({msg:"task uploaded",newtask})
    }
    catch(err){
        return res.status(500).json({msg:err.message})
    }
}

const gettask=async(req,res)=>{
    try{
          const user=await Task.find().populate("user");
          return res.status(200).json({msg:"task all list",user})
    }
    catch(err){
        return res.status(500).json({msg:err.message});
    }
}

const singletask = async (req, res) => {
    try {
        console.log("req.params>>",req.params)
        const { id } = req.params;
        console.log("id",id)
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: `Invalid task ID format: ${id}` });
        }
        const task = await Task.findById(id).populate('user');
        if(!task){
          
            return res.status(404).json({ msg: `Task with ID ${id} not found` });
        }
        if (!task) {
            return res.status(404).json({ msg: "Task not found" });
        }
        return res.status(200).json({ msg: "Single task fetched successfully", task });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}
const taskupdate=async(req,res)=>{
    const {task,description}=req.body
    try{
        const {id}=req.params;
        const user=await Task.findByIdAndUpdate(id,{
            task,
            description
        },{new:true}).populate('user')
        await user.save();
        return res.status(200).json({msg:"task updated successfully",user})
    }
    catch(err){
       return res.status(500).json({msg:err.message});
    }
}

const deletetask=async(req,res)=>{
    try{
        const {id}=req.params;
        const user=await Task.findByIdAndDelete(id).populate('user');
        return res.status(200).json({msg:"task deleted successfully",user})
    }
    catch(err){
        return res.status(500).json({msg:err.message}); 
    }
}
module.exports={taskpost,gettask,taskupdate,singletask,deletetask};