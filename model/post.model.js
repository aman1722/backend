const mongoose = require("mongoose")


//User Schema
const postSchema = mongoose.Schema({
    title:String,
    body:String,
    device:String,
    no_of_comments:Number,
    userId:String
},{
    versionKey:false
})

//User model
const PostModel = mongoose.model("post",postSchema)



module.exports={
    PostModel
}