import axios from 'axios';
import React from 'react';
import { useState,useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const data={
  task:"",
  description:"",
  user:{
    name:""
  }
}
const UpdateTask = () => {
   const {id}=useParams();
   const [updatetask,setUpdatetask]=useState(data);
   const [success,setSuccess]=useState("");
   const navigate=useNavigate("")
   useEffect(() => {
    const taskview = async (task_id) => {
      try {
        const response = await axios.get(`http://localhost:5000/singletask/${task_id}`);
        console.log(response.data)
        
        console.log("Fetched task data:",response.data);

        setUpdatetask(response.data.task)
        
      } catch (err) {
        console.log(err);
      }
    };
    
      taskview(id);
    
  }, [id]);
   const handlechange=(e)=>{
       e.preventDefault();
       const {name,value}=e.target;
       setUpdatetask({
           ...updatetask,
           [name]:value
       })
   }
   const handleClickupdate=async(e)=>{
    e.preventDefault();
        try{
             const response=await axios.put(`http://localhost:5000/taskupdate/${id}`,{updatetask})
             console.log(response.data);
             setSuccess(response.data.msg)
             setTimeout(()=>{
              setSuccess("")
              navigate("/tasklist")
             },2000)
        }
        catch(err){
           console.log(err)
        }
   }
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-3xl bg-white p-8 border border-x-black border-y-black shadow-2xl rounded-xl mx-4">
        <h1 className="font-bold text-4xl text-center text-gray-900 mb-8">Edit Task</h1>
          {
            success && (
              <>
              <span className='text-green-500 font-bold text-3xl'>{success}</span>
              </>
            )
          }
        <form onSubmit={handleClickupdate} className="space-y-6">
          
          <div>
          <h1 className='font-bold text-2xl'>{updatetask.user.name}</h1>
            <label className="block text-sm font-medium text-gray-600 mt-3">Task Title</label>
            <input 
              name="task"
              value={updatetask.task}
              type="text" 
              className="mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder='software..'
              onChange={handlechange}
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-600">Task Description</label>
            <textarea
              name="description"
              value={updatetask.description || ''}
              className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              rows="6"
              placeholder="Enter the task details here..."
              onChange={handlechange}
            />
          </div>

          
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg shadow-md transition-all duration-300">
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTask;
