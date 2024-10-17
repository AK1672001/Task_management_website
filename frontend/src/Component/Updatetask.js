import React from 'react';

const UpdateTask = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-3xl bg-white p-8 shadow-lg rounded-xl mx-4">
        <h1 className="font-bold text-4xl text-center text-gray-900 mb-8">Edit Task</h1>

        <form className="space-y-6">
          {/* Task Title */}
          <div>
          <h1 className='font-bold text-2xl'>amit</h1>
            <label className="block text-sm font-medium text-gray-600 mt-3">Task Title</label>
            <input 
              type="text" 
              className="mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder='software..'
              readOnly
            />
          </div>

          {/* Task Description */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Task Description</label>
            <textarea
              className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              rows="6"
              placeholder="Enter the task details here..."
            />
          </div>

          {/* Update Button */}
          <div className="flex justify-end">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg shadow-md transition-all duration-300">
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTask;
