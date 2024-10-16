const jwt = require("jsonwebtoken");
const User = require("../Modal/modal");
const dotenv=require("dotenv");
dotenv.config();
const Authenticate = async(req, res, next) => {
  try {
    const auth = req.headers["Authorization"];
    if(!auth)return res.status(404).json({msg:"Unthorized ,jwt token is require"})
    const decode=await jwt.verify(auth,process.env.SECRET_JWT);
    req.user=decode;
    next();
    
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = Authenticate;
