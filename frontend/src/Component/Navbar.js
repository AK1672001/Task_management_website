import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CreateContext } from "../App";
const Navbar = () => {
  const { auth, setAuth } = useContext(CreateContext);
  const [success, setSuccess] = useState("");
  const [logouticon, setLogoutIcon] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await axios.get("http://localhost:5000/logout");
      console.log(response.data);
      setSuccess(response.data.msg);

      if (response.data) {
        setTimeout(() => {
          setAuth("");
          navigate("/login");
          setSuccess("");
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="bg-blue-600 shadow-md">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link className="text-3xl font-bold text-white hover:text-gray-100 transition-all">
              Task Management
            </Link>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center">
            {auth ? (
              <>
                <Link
                  to="/tasklist"
                  className="w-full md:w-auto text-center bg-blue-900 hover:bg-blue-800 text-white py-2 px-4 rounded-lg transition-all"
                >
                  All Tasks
                </Link>
                <Link
                  to="/addtask"
                  className="w-full md:w-auto text-center bg-blue-900 hover:bg-blue-800 text-white py-2 px-4 rounded-lg transition-all"
                >
                  Add Task
                </Link>

                <Link
                  onClick={logout}
                  className="w-full md:w-auto text-center bg-red-700 hover:bg-blue-800 text-white py-2 px-4 rounded-lg transition-all"
                >
                  Logout
                </Link>

                <span className="text-white text-center cursor-pointer font-bold rounded-full w-10 h-10 bg-pink-700 p-1 items-center justify-center">
                  {auth.charAt(0).toUpperCase()}
                </span>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="w-full md:w-auto text-center bg-blue-900 hover:bg-blue-800 text-white py-2 px-4 rounded-lg transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/tasklist"
                  className="w-full md:w-auto text-center bg-blue-900 hover:bg-blue-800 text-white py-2 px-4 rounded-lg transition-all"
                >
                  All Tasks
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
      {success && (
        <>
          <p className="text-red-800 font-bold p-3 text-3xl">{success}</p>
        </>
      )}
    </header>
  );
};

export default Navbar;
