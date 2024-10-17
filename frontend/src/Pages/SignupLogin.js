import axios from "axios";
import React, { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const SignupLogin = () => {
  const [signup, setSignup] = useState(true);
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [success, setSuccess] = useState(""); 
  const [error, setError] = useState(""); 
  const navigate = useNavigate();
  
  useEffect(() => {
    // Retrieving the 'user' cookie if it exists
    const userCookie = Cookies.get("user");
    if (userCookie) {
      console.log("User cookie found: ", userCookie);
    } else {
      console.log("No user cookie found.");
    }
  }, []);
  
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/signup", user);
      setSuccess(response.data.msg);
      setTimeout(() => {
        setSuccess("");
        setSignup(false); 
      }, 2000);
    } catch (err) {
      setError(err.response.data.msg);
      setTimeout(() => setError(""), 2000);
    }
  };

 
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", user);
      setSuccess(response.data.msg);
      setTimeout(() => {
        setSuccess("");
        navigate("/tasklist"); 
      }, 2000);
    } catch (err) {
      setError(err.response.data.msg);
      setTimeout(() => setError(""), 2000);
    }
  };

  
  const toggleForm = () => {
    setSignup(!signup);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-2xl w-full max-w-md">
    
        {success && <div className="text-green-600 text-lg font-bold">{success}</div>}
        {error && <div className="text-red-600 text-lg font-bold">{error}</div>}

  
        {signup ? (
          <>
            <h1 className="text-3xl font-bold text-center mb-6">Create an Account</h1>
            <form onSubmit={handleSignup} className="space-y-4">
              <input
                type="text"
                name="name"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                placeholder="Your Name"
                required
              />
              <input
                type="email"
                name="email"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                placeholder="Email"
                required
              />
              <input
                type="password"
                name="password"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                placeholder="Password"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all"
              >
                Sign Up
              </button>
            </form>
            <p className="mt-4 text-center">
              Already have an account?{" "}
              <span
                onClick={toggleForm}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Log In
              </span>
            </p>
          </>
        ) : (
          <>
            {/* Login Form */}
            <h1 className="text-3xl font-bold text-center mb-6">Log In to Your Account</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                name="email"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                placeholder="Email"
                required
              />
              <input
                type="password"
                name="password"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                placeholder="Password"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all"
              >
                Log In
              </button>
            </form>
            <p className="mt-4 text-center">
              Don't have an account?{" "}
              <span
                onClick={toggleForm}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Sign Up
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default SignupLogin;
