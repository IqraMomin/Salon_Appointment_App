const Users = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async(req,res)=>{
    try{
        const data = req.body;
        const existingUser = await Users.findOne({
            where:{
                email:data.email
            }});
        if(existingUser){
            return res.status(400).json({message:"Email Already Exists"});
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password,saltRounds);
        const user = await Users.create({...data,password:hashedPassword});
        if(user){
            return res.status(201).json({message:"Registration Successful"});
        }

    }catch(err){
        console.log(err);
        return res.status(500).json({message:err.message})
    }
}

const login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await Users.findOne({
            where:{
                email
            }});
        if(!user){
            return res.status(404).json({message:"Invalid Credential"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid Passowrd"});
        }
        const token = await jwt.sign({id:user.id},process.env.JWT_SECRET_KEY);
        res.cookie("token",token,{
            httpOnly: true,
            sameSite: "strict"
        });
        const userData = user.toJSON();
        delete userData.password;
        res.status(200).json(userData);
    }catch(err){
        return res.status(500).json({message:"Login Failed"})
    }
}

module.exports = {signup}