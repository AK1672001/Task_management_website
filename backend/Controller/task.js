const Task=require("../Modal/task");
const User=require("../Modal/modal")
const taskpost=async(req,res)=>{
    
    const {task,description,user}=req.body;
    try{
        if(!task || !description)
            return res.status(404).json({msg:"task and description fill"})
        const userExists = await User.findById(user);
        if (!userExists) {
            return res.status(404).json({ msg: "User not found" });
        }
       
        
         const newtask=new Task({
             task,
             description,
             user
            
         })
         await newtask.save();
         return res.status(200).json({msg:"task uploaded",newtask,name:userExists.name})
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

// const getonetask=async(req,res)=>{
//     try{
//        const {id}=req.params;
//        const user=await Task.findById(id).populate('user');
//        return res.status(200).json({msg:" task fetched successfull..",user})
//     }
//     catch(err){
//         return res.status(500).json({msg:err.message})
//     }
// }
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
const singletask=async(req,res)=>{
    try{
        const {id}=req.params;
        const user=await Task.findById(id).populate('user')
        return res.status(200).json({msg:"task updated fetched successfully",user})
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