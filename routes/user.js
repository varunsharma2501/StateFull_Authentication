const {v4:uuidv4}=require('uuid');
const express=require('express');
const router=express.Router();
const User=require("../models/user");
const {setUser}=require("../service/auth");

router.get('/signup',(req,res)=>{
    return res.render("signup");
})

router.get('/login',(req,res)=>{
    return res.render("login")
})

router.post('/signup',async (req,res)=>{
    const {name,password,email}=req.body;
    try{
        const newUser=new User({
            name,
            email,
            password
        })
        await newUser.save();
        res.redirect("/user/login");
    }catch(err){
        console.log(err);
        res.status(500).send("Error signing in");
    }
}) 

router.post('/login',async (req,res)=>{
    const {name,password}=req.body;
    const user=await User.findOne({name,password});
    if(!user){
        console.log("unable to find the suer");
        return res.render("login",{error:"Username or password invalid"});
    }
    // console.log(user);
    const sessionId=uuidv4();
    setUser(sessionId,user);
    res.cookie("uid",sessionId);
    return res.redirect("/");
}) 
module.exports=router;