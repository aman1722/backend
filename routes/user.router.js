const express = require("express")
const {UserModel}=require("../model/user.model")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

const userRouter = express.Router()

// Registration logic
userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city,is_married}=req.body
    try {
        const alreadyExist=await UserModel.find({name,email})
        if(alreadyExist.length>0){
            res.status(200).send({"msg":"User already exist, please login"})
        }else{
            bcrypt.hash(password, 5, function(err, hash) {
                const user = new UserModel({name,email,gender,password:hash,age,city,is_married})
                user.save()
                res.status(200).send({"msg":"New user Registered!"})
            });
        }
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})


//Login logic
userRouter.post("/login",async(req,res)=>{
     const {email,password}=req.body
     try {
        const user = await UserModel.find({email})

        if(user.length>0){
            bcrypt.compare(password, user[0].password, function(err, result) {
                // result == true
                if(result){
                    res.status(200).send({"msg":"Login Successful!","token":jwt.sign({"userId":user[0]._id},"evaluation")})
                }else{
                    res.status(400).send({"msg":"Wrong Credentials!"})
                }
            });
        }else{
            res.status(400).send({"msg":"Login Failed!"})
        }
     } catch (error) {
        console.log(error)
        res.status(400).send({"msg":error.message})
     }
})


module.exports={
    userRouter
}

