const {signup,login,decode,verification,logout}=require("../Controller/controller")
const express=require("express");
const router=express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.get("/decode",decode);
router.get("/verification",decode,verification)
router.get("/logout",logout)
module.exports=router;