import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { CreateContext } from "../App";
import axios from "axios";
const data={
  task:"",
  description:"",
  _id:"",
  user: {
    name: "" 
  }
}
const ViewTask = () => {
  const { auth } = useContext(CreateContext);
  const [viewtask, setViewTask] = useState(data);
  const { id } = useParams();  
  console.log("id",id)
  useEffect(() => {
    const taskview = async (task_id) => {
      console.log("taskid",task_id)
      try {
        const response = await axios.get(`https://task-management-website-865l.onrender.com/singletask/${task_id}`);
        console.log(response.data)
        
        console.log("Fetched task data:",response.data);
        setViewTask(response.data.task)
        
      } catch (err) {
        console.log(err);
      }
    };
    
      taskview(id);
    
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-white p-10 shadow-2xl border border-x-black border-y-black rounded-xl mx-4">
        <h1 className="font-bold text-4xl text-center text-gray-900 mb-8">Task Details</h1>
        <form className="space-y-8">
          <h1 className="font-bold text-3xl">{viewtask.user?.name}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-gray-600">Task Title</label>
              <input
                type="text"
                className="mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="software..."
                value={viewtask.task || " "}  
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Task ID</label>
              <input
                type="text"
                className="mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="taskid..."
                value={viewtask._id || " "}  
                readOnly
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Description</label>
            <textarea
              className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
              rows="5"
              value={viewtask.description || ""} 
              readOnly
            ></textarea>
          </div>

          
        </form>
      </div>
    </div>
  );
};

export default ViewTask;
