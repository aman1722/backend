const mongoose = require("mongoose")


//User Schema
const userSchema = mongoose.Schema({
    name:String,
    email:String,
    gender:String,
    password:String,
    age:Number,
    city:String,
    is_married:Boolean
},{
    versionKey:false
})

//User model
const UserModel = mongoose.model("user",userSchema)



module.exports={
    UserModel
}